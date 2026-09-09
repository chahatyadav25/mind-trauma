/**
 * Cryptographic utility for securing local AASRA Chat History.
 *
 * Utilizes the native Web Crypto API (crypto.subtle):
 * - Random 16-byte cryptographic salt generation
 * - PBKDF2 key derivation with SHA-256 (100,000 iterations) for PIN verification
 * - AES-GCM-256 authenticated encryption for local conversation records
 *
 * Plain-text PINs are never persisted to localStorage or sent to any server.
 */

function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex: string): Uint8Array {
  const match = hex.match(/.{1,2}/g);
  if (!match) return new Uint8Array(0);
  return new Uint8Array(match.map(byte => parseInt(byte, 16)));
}

function getCrypto(): Crypto {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto as Crypto;
  }
  throw new Error('Web Crypto API is not available in this environment.');
}

/**
 * Generate a cryptographically random 16-byte salt as a hex string.
 */
export function generateSaltHex(): string {
  const cryptoObj = getCrypto();
  const saltBytes = new Uint8Array(16);
  cryptoObj.getRandomValues(saltBytes);
  return bufferToHex(saltBytes);
}

/**
 * Derives a PBKDF2 base key from user PIN string.
 */
async function getBaseKey(pin: string): Promise<CryptoKey> {
  const cryptoObj = getCrypto();
  const encoder = new TextEncoder();
  return cryptoObj.subtle.importKey(
    'raw',
    encoder.encode(pin),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
}

/**
 * Hashes a PIN with a salt using PBKDF2 with SHA-256 (100,000 iterations).
 * Returns a 256-bit hex digest.
 */
export async function hashPinWithSalt(pin: string, saltHex: string): Promise<string> {
  const baseKey = await getBaseKey(pin);
  const saltBytes = hexToBuffer(saltHex);

  const derivedBits = await getCrypto().subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    256 // 32 bytes
  );

  return bufferToHex(derivedBits);
}

/**
 * Verifies if an entered PIN matches the stored PBKDF2 hash.
 */
export async function verifyPinWithHash(enteredPin: string, saltHex: string, expectedHashHex: string): Promise<boolean> {
  try {
    const computedHash = await hashPinWithSalt(enteredPin, saltHex);
    return computedHash === expectedHashHex;
  } catch (err) {
    console.error('Error verifying PIN:', err);
    return false;
  }
}

/**
 * Derives an AES-GCM 256-bit encryption key from the user PIN and salt.
 */
async function deriveAesGcmKey(pin: string, saltHex: string): Promise<CryptoKey> {
  const baseKey = await getBaseKey(pin);
  const saltBytes = hexToBuffer(saltHex);

  return getCrypto().subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts arbitrary serializable data using AES-GCM-256.
 * Returns ciphertextHex and ivHex.
 */
export async function encryptChatPayload(data: unknown, pin: string, saltHex: string): Promise<{ ciphertextHex: string; ivHex: string }> {
  const key = await deriveAesGcmKey(pin, saltHex);
  const iv = new Uint8Array(12);
  getCrypto().getRandomValues(iv);

  const text = JSON.stringify(data);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(text);

  const encryptedBuffer = await getCrypto().subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encodedData
  );

  return {
    ciphertextHex: bufferToHex(encryptedBuffer),
    ivHex: bufferToHex(iv)
  };
}

/**
 * Decrypts AES-GCM-256 ciphertext with the provided PIN and salt.
 */
export async function decryptChatPayload<T = unknown>(ciphertextHex: string, ivHex: string, pin: string, saltHex: string): Promise<T> {
  const key = await deriveAesGcmKey(pin, saltHex);
  const iv = hexToBuffer(ivHex);
  const ciphertext = hexToBuffer(ciphertextHex);

  const decryptedBuffer = await getCrypto().subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  const jsonString = decoder.decode(decryptedBuffer);
  return JSON.parse(jsonString) as T;
}
