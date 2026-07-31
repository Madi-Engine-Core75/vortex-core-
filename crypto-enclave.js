class PsychologicallySafeEnclave {
  // توليد مفتاح تشفير محلي خاص بالمستخدم
  static async generateKey() {
    return window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  // تشفير الأفكار أو البيانات الحساسة قبل تخزينها محلياً لضمان الخصوصية المطلقة
  static async encryptPayload(secretKey, dataString) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector آمن وعشوائي
    const encodedData = new TextEncoder().encode(dataString);

    const ciphertext = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      secretKey,
      encodedData
    );

    return {
      ciphertext: Array.from(new Uint8Array(ciphertext)),
      iv: Array.from(iv)
    };
  }
}
