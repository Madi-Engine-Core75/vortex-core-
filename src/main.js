const { generateKey, encrypt, decrypt } = require('./crypto');

console.log("=== Vortex-Core Social Platform Initialized ===");

// 1. توليد مفتاح سري
const secretKey = generateKey();
console.log("Generated Key:", secretKey);

// 2. رسالة تجريبية
const originalMessage = "Secret payload: Hello MadiEngineCore!";
console.log("Original:", originalMessage);

// 3. التشفير
const encryptedPackage = encrypt(originalMessage, secretKey);
console.log("Encrypted Payload:", encryptedPackage);

// 4. فك التشفير
const decryptedMessage = decrypt(encryptedPackage, secretKey);
console.log("Decrypted:", decryptedMessage);
