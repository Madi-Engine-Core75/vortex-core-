// src/adaptive-perf.js
(function() {
    const start = performance.now();
    let count = 0;
    for (let i = 0; i < 1e6; i++) { 
        count += Math.sqrt(i); 
    }
    const duration = performance.now() - start;

    const bodyClass = document.body.classList;
    
    // إذا استغرقت الحسابات وقتاً أطول، فهذا يعني أن الهاتف ضعيف -> يتم تفعيل وضع الأداء
    if (duration > 15) {
        bodyClass.add('lite-mode');
        console.log('[Vortex Performance] Low-end device detected: Lite Mode active (No Backdrop-Filter).');
    } else {
        bodyClass.add('cyber-glass-mode');
        console.log('[Vortex Performance] High-end device detected: Cyber Glassmorphism active.');
    }
})();
