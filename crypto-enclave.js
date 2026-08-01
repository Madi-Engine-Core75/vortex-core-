/**
 * PsychologicallySafeEnclave - الدوائر المعزولة وتشفير السيادة المطلقة
 * مسؤول عن حماية البيانات محلياً باستخدام معيار التشفير العالمي AES-256-GCM
 * لضمان حرية التفكير والإبداع دون خوف من التتبع أو المراقبة.
 */
class PsychologicallySafeEnclave {
  /**
   * توليد مفتاح تشفير محلي فريد وقوي (256-bit)
   * @returns {Promise<CryptoKey>}
   */
  static async generateSecureKey() {
    return window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  // Helper: convert ArrayBuffer to base64 without spreading large arrays
  static _arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 0x8000; // 32k chunks to avoid call stack limits
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
  }

  // Helper: convert base64 to ArrayBuffer
  static _base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Export a CryptoKey to Base64 so it can be persisted between sessions
   * @param {CryptoKey} secretKey
   * @returns {Promise<string>} base64 encoded raw key
   */
  static async exportKeyToBase64(secretKey) {
    try {
      const raw = await window.crypto.subtle.exportKey('raw', secretKey);
      return this._arrayBufferToBase64(raw);
    } catch (err) {
      console.error('[Crypto Enclave] Failed to export key.', err);
      throw new Error('KEY_EXPORT_FAILED');
    }
  }

  /**
   * Import a Base64-encoded raw key back into a CryptoKey
   * @param {string} b64
   * @returns {Promise<CryptoKey>}
   */
  static async importKeyFromBase64(b64) {
    try {
      const rawBuffer = this._base64ToArrayBuffer(b64);
      const key = await window.crypto.subtle.importKey(
        'raw',
        rawBuffer,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
      return key;
    } catch (err) {
      console.error('[Crypto Enclave] Failed to import key.', err);
      throw new Error('KEY_IMPORT_FAILED');
    }
  }

  /**
   * تشفير البيانات (الحمولات النصية أو الأفكار) داخل الدائرة المعزولة محلياً
   * @param {CryptoKey} secretKey - مفتاح التشفير المحلي
   * @param {string} plainText - النص المراد تشفيره وتأمينه
   * @returns {Promise<Object>} - كائن يحتوي على البيانات المشفرة ومُتجه التهيئة (IV)
   */
  static async encryptData(secretKey, plainText) {
    if (!plainText || typeof plainText !== 'string') {
      throw new Error('[Crypto Enclave] Invalid plaintext provided for encryption.');
    }

    // توليد مُتجه تهيئة عشوائي وآمن (Initialization Vector) لمنع هجمات التكرار
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(plainText);

    try {
      const ciphertextBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        secretKey,
        encodedData
      );

      // Return both array-of-bytes (convenient for some consumers) and base64 (compact)
      const ciphertextArray = Array.from(new Uint8Array(ciphertextBuffer));
      const ciphertextBase64 = this._arrayBufferToBase64(ciphertextBuffer);
      const ivBase64 = this._arrayBufferToBase64(iv.buffer);

      return {
        ciphertext: ciphertextArray,
        iv: Array.from(iv),
        ciphertext_b64: ciphertextBase64,
        iv_b64: ivBase64,
        securedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.error('[Crypto Enclave] Encryption failed.', err);
      throw new Error('SECURITY_ENCRYPTION_FAILED');
    }
  }

  /**
   * فك تشفير البيانات داخل مساحة المستخدم الآمنة حصرياً
   * @param {CryptoKey} secretKey
   * @param {Array<number>|string} cipherInput - إمّا مصفوفة أرقام أو نص Base64
   * @param {Array<number>|string} ivInput - إمّا مصفوفة أرقام أو نص Base64
   * @returns {Promise<string>}
   */
  static async decryptData(secretKey, cipherInput, ivInput) {
    let cipherBuffer;
    let ivBuffer;

    // Normalize inputs: accept arrays or base64 strings
    if (typeof cipherInput === 'string') {
      // assume base64
      cipherBuffer = new Uint8Array(this._base64ToArrayBuffer(cipherInput));
    } else if (Array.isArray(cipherInput)) {
      cipherBuffer = new Uint8Array(cipherInput);
    } else {
      throw new Error('[Crypto Enclave] Invalid cipher format. Expected base64 string or array of numbers.');
    }

    if (typeof ivInput === 'string') {
      ivBuffer = new Uint8Array(this._base64ToArrayBuffer(ivInput));
    } else if (Array.isArray(ivInput)) {
      ivBuffer = new Uint8Array(ivInput);
    } else {
      throw new Error('[Crypto Enclave] Invalid IV format. Expected base64 string or array of numbers.');
    }

    if (ivBuffer.length < 12) {
      throw new Error('[Crypto Enclave] IV length too short; AES-GCM recommends 12 bytes.');
    }

    try {
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: ivBuffer },
        secretKey,
        cipherBuffer
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      console.error('[Crypto Enclave] Decryption failed. Key or payload integrity compromised.', error);
      throw new Error('SECURITY_DECRYPTION_FAILED');
    }
  }
}

export default PsychologicallySafeEnclave;
