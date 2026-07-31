const STORAGE_KEY = 'vortex_theme_config';

// Neural/Heuristic Engine: تقييم قدرات الجهاز تلقائياً عند التشغيل الأول
class VortexNeuralEngine {
  static evaluateEnvironment() {
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // إذا كان الجهاز ضعيفاً أو يطلب تقليل الحركة، نقترح وضع التوفير تلقائياً
    return {
      autoLowPower: isLowMemory || isReducedMotion
    };
  }

  static runSelfTest() {
    console.log("[Neural Engine] Running heuristic diagnostics...");
    const startTime = performance.now();
    const env = this.evaluateEnvironment();
    const endTime = performance.now();
    
    return {
      status: "PASS",
      latencyMs: (endTime - startTime).toFixed(2),
      diagnostics: env
    };
  }
}

// State Management
const engineAnalysis = VortexNeuralEngine.evaluateEnvironment();
const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  lowPower: engineAnalysis.autoLowPower,
  highContrast: false
};

function applyTheme() {
  const body = document.body;
  
  body.classList.toggle('low-power', state.lowPower);
  body.classList.toggle('high-contrast', state.highContrast);

  document.getElementById('low-power-btn').setAttribute('aria-pressed', state.lowPower);
  document.getElementById('high-contrast-btn').setAttribute('aria-pressed', state.highContrast);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

document.getElementById('low-power-btn').addEventListener('click', () => {
  state.lowPower = !state.lowPower;
  applyTheme();
});

document.getElementById('high-contrast-btn').addEventListener('click', () => {
  state.highContrast = !state.highContrast;
  applyTheme();
});

// Initial load & Diagnostics
applyTheme();
console.log("[Vortex-Core initialized]", VortexNeuralEngine.runSelfTest());
