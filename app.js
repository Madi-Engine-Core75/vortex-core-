document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'vortex_theme_config';

  let state;
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { lowPower: false, highContrast: false };
  } catch (err) {
    console.warn('[app] Invalid theme config in localStorage, resetting.', err);
    state = { lowPower: false, highContrast: false };
  }

  const lowBtn = document.getElementById('low-power-btn');
  const highBtn = document.getElementById('high-contrast-btn');

  function applyTheme() {
    const body = document.body;
    body.classList.toggle('low-power', !!state.lowPower);
    body.classList.toggle('high-contrast', !!state.highContrast);

    if (lowBtn) lowBtn.setAttribute('aria-pressed', !!state.lowPower);
    if (highBtn) highBtn.setAttribute('aria-pressed', !!state.highContrast);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('[app] Failed to save theme config to localStorage', err);
    }
  }

  if (lowBtn) lowBtn.addEventListener('click', () => {
    state.lowPower = !state.lowPower;
    applyTheme();
  });

  if (highBtn) highBtn.addEventListener('click', () => {
    state.highContrast = !state.highContrast;
    applyTheme();
  });

  applyTheme();
});
