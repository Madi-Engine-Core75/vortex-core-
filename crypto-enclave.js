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
        name: "AES-GCM", 
        length: 256 
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  /**
   * Export a CryptoKey to Base64 so it can be persisted between sessions
   * @param {CryptoKey} secretKey
   * @returns {Promise<string>} base64 encoded raw key
   */
  static async exportKeyToBase64(secretKey) {
    const raw = await window.crypto.subtle.exportKey('raw', secretKey);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(raw)));
    return b64;
  }

  /**
   * Import a Base64-encoded raw key back into a CryptoKey
   * @param {string} b64
   * @returns {Promise<CryptoKey>}
   */
  static async importKeyFromBase64(b64) {
    const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const key = await window.crypto.subtle.importKey(
      'raw',
      raw.buffer,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }

  /**
   * تشفير البيانات (الحمولات النصية أو الأفكار) داخل الدائرة المعزولة محلياً
   * @param {CryptoKey} secretKey - مفتاح التشفير المحلي
   * @param {string} plainText - النص المراد تشفيره وتأمينه
   * @returns {Promise<Object>} - كائن يحتوي على البيانات المشفرة ومُتجه التهيئة (IV)
   */
  static async encryptData(secretKey, plainText) {
    if (!plainText || typeof plainText !== 'string') {
      throw new Error("[Crypto Enclave] Invalid plaintext provided for encryption.");
    }

    // توليد مُتجه تهيئة عشوائي وآمن (Initialization Vector) لمنع هجمات التكرار
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(plainText);

    const ciphertext = await window.crypto.subtle.encrypt(
      { 
        name: "AES-GCM", 
        iv: iv 
      },
      secretKey,
      encodedData
    );

    return {
      ciphertext: Array.from(new Uint8Array(ciphertext)),
      iv: Array.from(iv),
      securedAt: new Date().toISOString()
    };
  }

  /**
   * فك تشفير البيانات داخل مساحة المستخدم الآمنة حصرياً
   * @param {CryptoKey} secretKey 
   * @param {Array<number>} cipherArray 
   * @param {Array<number>} ivArray 
   * @returns {Promise<string>}
   */
  static async decryptData(secretKey, cipherArray, ivArray) {
    if (!Array.isArray(cipherArray) || !Array.isArray(ivArray)) {
      throw new Error("[Crypto Enclave] Invalid cipher or iv format. Expected arrays of numbers.");
    }
    if (ivArray.length < 12) {
      throw new Error("[Crypto Enclave] IV length too short; AES-GCM recommends 12 bytes.");
    }

    try {
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { 
          name: "AES-GCM", 
          iv: new Uint8Array(ivArray) 
        },
        secretKey,
        new Uint8Array(cipherArray)
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      console.error("[Crypto Enclave] Decryption failed. Key or payload integrity compromised.", error);
      throw new Error("SECURITY_DECRYPTION_FAILED");
    }
  }
}

export default PsychologicallySafeEnclave;
