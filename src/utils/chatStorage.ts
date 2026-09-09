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

export interface EncryptedStoreEnvelope {
  version: number;
  ciphertextHex: string;
  ivHex: string;
  sessionCount: number;
  updatedAt: number;
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
 * - Initializes or migrates existing sessions with new encryption key
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

    // Save encrypted sessions under the new PIN
    await saveEncryptedSessions(initialSessions, pin);

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
 */
export async function loadDecryptedSessions(pin: string): Promise<ChatSession[]> {
  const auth = getChatAuth();
  if (!auth) return [];

  const raw = localStorage.getItem(STORAGE_ENCRYPTED_SESSIONS_KEY);
  if (!raw) return [];

  try {
    const envelope: EncryptedStoreEnvelope = JSON.parse(raw);
    if (!envelope.ciphertextHex || !envelope.ivHex) return [];

    const sessions = await decryptChatPayload<ChatSession[]>(
      envelope.ciphertextHex,
      envelope.ivHex,
      pin,
      auth.salt
    );

    if (Array.isArray(sessions)) {
      return sessions.sort((a, b) => b.updatedAt - a.updatedAt);
    }
    return [];
  } catch (err) {
    console.error('Failed to decrypt sessions with PIN:', err);
    throw new Error('Incorrect PIN or corrupted chat data.');
  }
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
    if (resetPin) {
      localStorage.removeItem(STORAGE_AUTH_KEY);
    }
  } catch (err) {
    console.warn('Could not clear chat history from storage:', err);
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
