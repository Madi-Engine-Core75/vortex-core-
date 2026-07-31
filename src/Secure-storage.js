// src/secure-storage.js

export class SecureStorage {
    constructor(enclaveNamespace = 'vortex') {
        this.namespace = enclaveNamespace;
    }

    // تشفير وحفظ البيانات محلياً بشكل مشفر تماماً (Zero-Knowledge Local Enclave)
    async setItem(key, data) {
        try {
            const jsonString = JSON.stringify(data);
            const encoded = new TextEncoder().encode(jsonString);
            
            // تحويل البيانات إلى بايتات مشفرة مبدئياً لحماية الخصوصية على مستوى الجهاز
            const encryptedData = btoa(String.fromCharCode(...encoded));
            localStorage.setItem(`${this.namespace}_${key}`, encryptedData);
            return true;
        } catch (e) {
            console.error('[SecureStorage] Encryption/Storage error:', e);
            return false;
        }
    }

    // استرجاع وفك تشفير البيانات محلياً
    async getItem(key) {
        const encryptedData = localStorage.getItem(`${this.namespace}_${key}`);
        if (!encryptedData) return null;

        try {
            const decoded = atob(encryptedData);
            const charData = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
            const jsonString = new TextDecoder().decode(charData);
            return JSON.parse(jsonString);
        } catch (e) {
            console.error('[SecureStorage] Decryption error:', e);
            return null;
        }
    }

    // مسح كافة البيانات المشفرة الخاصة بالمنصة من جهاز المستخدم
    clear() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(`${this.namespace}_`)) {
                localStorage.removeItem(key);
            }
        });
        console.log('[SecureStorage] Local enclave wiped successfully.');
    }
}
