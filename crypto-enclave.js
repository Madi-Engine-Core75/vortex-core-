// CryptoEnclave - client-side Web Crypto helpers (AES-GCM)
// Returns base64-encoded ciphertext and iv for easy storage/transfer.

function toBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(b64) {
  const str = atob(b64);
  const arr = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

export default class CryptoEnclave {
  static async generateKey() {
    return window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async exportKeyToBase64(key) {
    const raw = await window.crypto.subtle.exportKey('raw', key);
    return toBase64(new Uint8Array(raw));
  }

  static async importKeyFromBase64(b64) {
    const bytes = fromBase64(b64);
    return window.crypto.subtle.importKey('raw', bytes, 'AES-GCM', true, ['encrypt', 'decrypt']);
  }

  static async encrypt(key, plainText) {
    if (!plainText || typeof plainText !== 'string') {
      throw new Error('Invalid plaintext provided for encryption');
    }

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plainText);
    const ciphertextBuffer = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

    return {
      ciphertext: toBase64(new Uint8Array(ciphertextBuffer)),
      iv: toBase64(iv),
      securedAt: new Date().toISOString()
    };
  }

  static async decrypt(key, b64Ciphertext, b64Iv) {
    try {
      const cipher = fromBase64(b64Ciphertext);
      const iv = fromBase64(b64Iv);
      const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
      return new TextDecoder().decode(decrypted);
    } catch (err) {
      console.error('[CryptoEnclave] Decryption failed', err);
      throw new Error('SECURITY_DECRYPTION_FAILED');
    }
  }
}
