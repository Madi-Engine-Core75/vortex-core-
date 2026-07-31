import { SecureStorage } from './secure-storage.js';

async function runSecureTest() {
    console.log('--- Starting SecureStorage Enclave Test ---');
    
    const secureStorage = new SecureStorage('vortex');

    // 1. اختبار حفظ بيانات مشفرة
    const sessionData = { 
        node: 'Active', 
        tier: 'sovereign', 
        timestamp: new Date().toISOString() 
    };
    
    await secureStorage.setItem('node_session', sessionData);
    console.log('[SecureStorage] Session data successfully locked and encrypted in local enclave.');

    // 2. اختبار استرجاع وفك تشفير البيانات
    const retrievedData = await secureStorage.getItem('node_session');
    console.log('[SecureStorage] Retrieved and decrypted session:', retrievedData);
}

runSecureTest();
