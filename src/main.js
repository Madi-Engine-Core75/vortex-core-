// Vortex-Core Initial Entry Point
(function () {
  console.log("Vortex-Core Social Platform Initialized.");

  function initUI() {
    // Guard: make sure we're in a browser-like environment with a DOM
    if (typeof document === "undefined") {
      console.log("No DOM available to initialize the UI.");
      return;
    }

    const appContainer = document.getElementById("app") || document.body;

    // تطبيق واجهة Cyber Glassmorphic مع تدرجات مظلمة ولمسات نيون
    appContainer.style.background = "#0b0f19";
    appContainer.style.color = "#00ffcc";
    appContainer.style.fontFamily = "monospace";

    console.log("Cyber Glassmorphism theme loaded successfully.");
  }

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initUI);
    } else {
      initUI();
    }
  } else {
    console.log("Running in a non-browser environment (Node). Skipping DOM initialization.");
  }

  // Export for CommonJS or attach to window for browser bundles
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { initUI };
  } else if (typeof window !== "undefined") {
    window.VortexCore = window.VortexCore || {};
    window.VortexCore.initUI = initUI;
  }
})();
