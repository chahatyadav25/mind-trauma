import { ChatMessage, ChatSession, ChatHistoryAuth } from '../types';
import {
  generateSaltHex,
  hashPinWithSalt,
  verifyPinWithHash,
  encryptChatPayload,
  decryptChatPayload
} from './chatCrypto';

const STORAGE_AUTH_KEY = 'mindtrauma_asra_auth';
const STORAGE_ENCRYPTED_SESSIONS_KEY = 'mindtrauma_asra_encrypted_sessions';
const STORAGE_CURRENT_SESSION_KEY = 'mindtrauma_asra_current_session';
const STORAGE_PENDING_SESSIONS_KEY = 'mindtrauma_asra_pending_sessions';
const STORAGE_UNPROTECTED_SESSIONS_KEY = 'mindtrauma_asra_sessions_unprotected';
const SESSION_PIN_KEY = 'mindtrauma_asra_active_pin';

export interface EncryptedStoreEnvelope {
  version: number;
  ciphertextHex: string;
  ivHex: string;
  sessionCount: number;
  updatedAt: number;
}

/**
 * Access the active PIN cached in browser sessionStorage for this tab only.
 * Plain-text PINs are never saved to localStorage.
 */
export function getActiveSessionPin(): string | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem(SESSION_PIN_KEY);
    }
  } catch (err) {
    console.warn('Could not read session PIN:', err);
  }
  return null;
}

export function setActiveSessionPin(pin: string | null): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (pin) {
        window.sessionStorage.setItem(SESSION_PIN_KEY, pin);
      } else {
        window.sessionStorage.removeItem(SESSION_PIN_KEY);
      }
    }
  } catch (err) {
    console.warn('Could not set session PIN:', err);
  }
}

/**
 * Buffer helpers for auto-saved sessions pending PIN encryption
 */
export function getPendingSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_PENDING_SESSIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function savePendingSession(session: ChatSession): void {
  try {
    const list = getPendingSessions();
    const idx = list.findIndex(s => s.id === session.id);
    let updated: ChatSession[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = session;
    } else {
      updated = [session, ...list];
    }
    localStorage.setItem(STORAGE_PENDING_SESSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save pending session:', err);
  }
}

export function removePendingSession(sessionId: string): void {
  try {
    const list = getPendingSessions();
    const filtered = list.filter(s => s.id !== sessionId);
    if (filtered.length > 0) {
      localStorage.setItem(STORAGE_PENDING_SESSIONS_KEY, JSON.stringify(filtered));
    } else {
      localStorage.removeItem(STORAGE_PENDING_SESSIONS_KEY);
    }
  } catch {}
}

export function clearPendingSessions(): void {
  try {
    localStorage.removeItem(STORAGE_PENDING_SESSIONS_KEY);
  } catch {}
}

export function getUnprotectedSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_UNPROTECTED_SESSIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function saveUnprotectedSession(session: ChatSession): void {
  try {
    const list = getUnprotectedSessions();
    const idx = list.findIndex(s => s.id === session.id);
    let updated: ChatSession[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = session;
    } else {
      updated = [session, ...list];
    }
    localStorage.setItem(STORAGE_UNPROTECTED_SESSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save unprotected session:', err);
  }
}

export function clearUnprotectedSessions(): void {
  try {
    localStorage.removeItem(STORAGE_UNPROTECTED_SESSIONS_KEY);
  } catch {}
}

/**
 * Loads the stored authentication record (salt, hash) if configured.
 */
export function getChatAuth(): ChatHistoryAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.salt && parsed.pinHash) {
      return parsed as ChatHistoryAuth;
    }
  } catch (err) {
    console.warn('Could not read chat auth metadata:', err);
  }
  return null;
}

/**
 * Checks if a PIN has been created yet.
 */
export function isPinConfigured(): boolean {
  const auth = getChatAuth();
  return !!auth?.isConfigured;
}

/**
 * Saves or updates authentication record.
 */
export function saveChatAuth(auth: ChatHistoryAuth): void {
  try {
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(auth));
  } catch (err) {
    console.warn('Could not save chat auth metadata:', err);
  }
}

/**
 * Sets up a brand new user PIN:
 * - Generates random salt
 * - Computes PBKDF2 hash
 * - Saves auth record
 * - Migrates existing unprotected and pending sessions into encrypted storage
 */
export async function setupChatPin(pin: string, initialSessions: ChatSession[] = []): Promise<{ success: boolean; error?: string }> {
  try {
    if (!pin || pin.length < 4) {
      return { success: false, error: 'PIN must be at least 4 digits or characters.' };
    }

    const salt = generateSaltHex();
    const pinHash = await hashPinWithSalt(pin, salt);

    const auth: ChatHistoryAuth = {
      isConfigured: true,
      salt,
      pinHash,
      updatedAt: Date.now()
    };

    saveChatAuth(auth);

    // Gather all existing unprotected sessions + pending + initialSessions
    const unprotected = getUnprotectedSessions();
    const pending = getPendingSessions();
    const combinedMap = new Map<string, ChatSession>();

    for (const s of [...initialSessions, ...pending, ...unprotected]) {
      if (s && s.id) combinedMap.set(s.id, s);
    }
    const allToEncrypt = Array.from(combinedMap.values());

    // Save encrypted sessions under the new PIN
    await saveEncryptedSessions(allToEncrypt, pin);
    clearUnprotectedSessions();
    clearPendingSessions();
    setActiveSessionPin(pin);

    return { success: true };
  } catch (err: any) {
    console.error('Failed to setup PIN:', err);
    return { success: false, error: err?.message || 'Failed to setup PIN' };
  }
}

/**
 * Verifies entered PIN against stored PBKDF2 hash.
 */
export async function verifyEnteredPin(enteredPin: string): Promise<boolean> {
  const auth = getChatAuth();
  if (!auth) return false;
  return verifyPinWithHash(enteredPin, auth.salt, auth.pinHash);
}

/**
 * Decrypts and loads all saved chat sessions from localStorage.
 * Automatically merges any auto-saved pending sessions and re-encrypts them.
 */
export async function loadDecryptedSessions(pin: string): Promise<ChatSession[]> {
  const auth = getChatAuth();
  if (!auth) return [];

  const raw = localStorage.getItem(STORAGE_ENCRYPTED_SESSIONS_KEY);
  let sessions: ChatSession[] = [];

  if (raw) {
    try {
      const envelope: EncryptedStoreEnvelope = JSON.parse(raw);
      if (envelope.ciphertextHex && envelope.ivHex) {
        const decrypted = await decryptChatPayload<ChatSession[]>(
          envelope.ciphertextHex,
          envelope.ivHex,
          pin,
          auth.salt
        );
        if (Array.isArray(decrypted)) {
          sessions = decrypted;
        }
      }
    } catch (err) {
      console.error('Failed to decrypt sessions with PIN:', err);
      throw new Error('Incorrect PIN or corrupted chat data.');
    }
  }

  // Merge any pending auto-saved sessions
  const pending = getPendingSessions();
  const unprotected = getUnprotectedSessions();
  const toMerge = [...pending, ...unprotected];

  if (toMerge.length > 0) {
    let hasChanges = false;
    for (const item of toMerge) {
      const idx = sessions.findIndex(s => s.id === item.id);
      if (idx >= 0) {
        if (item.updatedAt >= sessions[idx].updatedAt || item.messages.length > sessions[idx].messages.length) {
          sessions[idx] = item;
          hasChanges = true;
        }
      } else {
        sessions.unshift(item);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await saveEncryptedSessions(sessions, pin);
      clearPendingSessions();
      clearUnprotectedSessions();
    }
  }

  return sessions.sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Encrypts and saves all chat sessions to localStorage.
 */
export async function saveEncryptedSessions(sessions: ChatSession[], pin: string): Promise<void> {
  const auth = getChatAuth();
  if (!auth) {
    throw new Error('Chat history PIN is not configured.');
  }

  const { ciphertextHex, ivHex } = await encryptChatPayload(sessions, pin, auth.salt);

  const envelope: EncryptedStoreEnvelope = {
    version: 1,
    ciphertextHex,
    ivHex,
    sessionCount: sessions.length,
    updatedAt: Date.now()
  };

  localStorage.setItem(STORAGE_ENCRYPTED_SESSIONS_KEY, JSON.stringify(envelope));
}

/**
 * Changes user PIN:
 * - Validates current PIN
 * - Decrypts existing sessions
 * - Generates new salt and new PBKDF2 hash
 * - Re-encrypts all sessions with the new PIN
 */
export async function changeChatPin(
  currentPin: string,
  newPin: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const isValidCurrent = await verifyEnteredPin(currentPin);
    if (!isValidCurrent) {
      return { success: false, error: 'Current PIN is incorrect.' };
    }

    if (!newPin || newPin.length < 4) {
      return { success: false, error: 'New PIN must be at least 4 digits or characters.' };
    }

    if (currentPin === newPin) {
      return { success: false, error: 'New PIN must be different from current PIN.' };
    }

    // Decrypt existing sessions using current PIN
    let currentSessions: ChatSession[] = [];
    try {
      currentSessions = await loadDecryptedSessions(currentPin);
    } catch {
      currentSessions = [];
    }

    // Generate new salt and hash
    const newSalt = generateSaltHex();
    const newHash = await hashPinWithSalt(newPin, newSalt);

    const newAuth: ChatHistoryAuth = {
      isConfigured: true,
      salt: newSalt,
      pinHash: newHash,
      updatedAt: Date.now()
    };

    saveChatAuth(newAuth);

    // Re-encrypt under new credentials
    const { ciphertextHex, ivHex } = await encryptChatPayload(currentSessions, newPin, newSalt);
    const envelope: EncryptedStoreEnvelope = {
      version: 1,
      ciphertextHex,
      ivHex,
      sessionCount: currentSessions.length,
      updatedAt: Date.now()
    };
    localStorage.setItem(STORAGE_ENCRYPTED_SESSIONS_KEY, JSON.stringify(envelope));

    return { success: true };
  } catch (err: any) {
    console.error('Failed to change PIN:', err);
    return { success: false, error: err?.message || 'Failed to change PIN' };
  }
}

/**
 * Deletes all chat history permanently.
 * Optionally resets PIN if requested.
 */
export function clearAllChatHistory(resetPin = false): void {
  try {
    localStorage.removeItem(STORAGE_ENCRYPTED_SESSIONS_KEY);
    localStorage.removeItem(STORAGE_CURRENT_SESSION_KEY);
    localStorage.removeItem(STORAGE_PENDING_SESSIONS_KEY);
    localStorage.removeItem(STORAGE_UNPROTECTED_SESSIONS_KEY);
    setActiveSessionPin(null);
    if (resetPin) {
      localStorage.removeItem(STORAGE_AUTH_KEY);
    }
  } catch (err) {
    console.warn('Could not clear chat history from storage:', err);
  }
}

/**
 * Automatically persists the conversation session as the user chats.
 * - Updates STORAGE_CURRENT_SESSION_KEY so active chat is never lost on refresh or navigation.
 * - If session contains user messages, automatically preserves it in the history archive:
 *   - If PIN is configured and unlocked in sessionStorage, encrypts and saves immediately.
 *   - If PIN is configured but locked, stores in pending buffer to be merged upon unlock.
 *   - If PIN is not configured yet, stores in unprotected sessions list.
 */
export async function autoSaveSessionToHistory(session: ChatSession): Promise<void> {
  // Always update current active session immediately
  saveActiveChatSession(session);

  const hasUserMessages = session.messages.some(m => m.sender === 'user');
  if (!hasUserMessages) return;

  const sessionWithTitle: ChatSession = {
    ...session,
    title: session.title === 'New Consultation' ? autoGenerateTitle(session.messages) : session.title,
    updatedAt: Date.now()
  };

  const configured = isPinConfigured();
  const sessionPin = getActiveSessionPin();

  if (configured) {
    if (sessionPin) {
      try {
        const loaded = await loadDecryptedSessions(sessionPin);
        const existingIdx = loaded.findIndex(s => s.id === sessionWithTitle.id);
        let updatedList: ChatSession[];
        if (existingIdx >= 0) {
          updatedList = [...loaded];
          updatedList[existingIdx] = sessionWithTitle;
        } else {
          updatedList = [sessionWithTitle, ...loaded];
        }
        await saveEncryptedSessions(updatedList, sessionPin);
        // Clear any pending buffer entry for this session
        removePendingSession(sessionWithTitle.id);
        return;
      } catch (err) {
        console.warn('Direct encryption with session PIN failed, storing to pending buffer:', err);
      }
    }
    // If not unlocked yet or failed, save to pending buffer
    savePendingSession(sessionWithTitle);
  } else {
    // PIN not configured yet: save to unprotected store
    saveUnprotectedSession(sessionWithTitle);
  }
}

/**
 * Archives current active session to history if it has user messages,
 * ensuring starting a new chat never discards previous conversations.
 */
export async function archiveActiveSessionBeforeNew(session: ChatSession): Promise<void> {
  const hasUserMessages = session.messages.some(m => m.sender === 'user');
  if (hasUserMessages) {
    await autoSaveSessionToHistory(session);
  }
}

/**
 * Loads the active conversation session that is currently in progress.
 * If none exists, creates a fresh initial session.
 */
export function loadActiveChatSession(): ChatSession {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && Array.isArray(parsed.messages)) {
        return parsed as ChatSession;
      }
    }
  } catch (err) {
    console.warn('Could not load current session from localStorage:', err);
  }

  // Fallback initial session
  return createInitialChatSession();
}

/**
 * Saves the active conversation in progress so that closing/reopening the app does not lose the chat.
 */
export function saveActiveChatSession(session: ChatSession): void {
  try {
    localStorage.setItem(STORAGE_CURRENT_SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn('Could not save current session to localStorage:', err);
  }
}

/**
 * Generates an initial welcome session.
 */
export function createInitialChatSession(): ChatSession {
  const now = Date.now();
  return {
    id: `sess-${now}`,
    title: 'New Consultation',
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Hello. I'm AASRA, your trauma-informed psychoeducational companion. I'm here to offer supportive guidance, explain clinical terms, and guide you through calming grounding practices.\n\nWhat would feel most helpful for you to explore right now?",
        timestamp: 'Just now'
      }
    ]
  };
}

/**
 * Generates an intuitive title based on the first user message.
 */
export function autoGenerateTitle(messages: ChatMessage[]): string {
  const firstUserMsg = messages.find(m => m.sender === 'user');
  if (!firstUserMsg || !firstUserMsg.text.trim()) {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `AASRA Session (${dateStr})`;
  }

  let text = firstUserMsg.text.trim().replace(/[\r\n]+/g, ' ');
  // Remove common inquiry prefixes
  text = text.replace(/^(can you explain|what is|tell me about|how to|i feel|help with)\s+/i, '');

  // Truncate to first 6-8 words or max 40 chars
  const words = text.split(/\s+/);
  let title = words.slice(0, 6).join(' ');
  if (title.length > 38) {
    title = title.substring(0, 38).trim() + '...';
  } else if (words.length > 6) {
    title += '...';
  }

  // Capitalize first letter
  return title.charAt(0).toUpperCase() + title.slice(1);
}

/**
 * Formats a Unix timestamp into a readable date and time string.
 */
export function formatSessionDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
