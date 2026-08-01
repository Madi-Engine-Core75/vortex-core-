// Vortex Client: theme manager - DOM-safe and robust
const STORAGE_KEY = 'vortex_theme_config';

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function applyTheme(state) {
  const body = document.body;
  if (!body) return;

  body.classList.toggle('low-power', !!state.lowPower);
  body.classList.toggle('high-contrast', !!state.highContrast);

  const lowBtn = document.getElementById('low-power-btn');
  const highBtn = document.getElementById('high-contrast-btn');

  if (lowBtn) lowBtn.setAttribute('aria-pressed', String(!!state.lowPower));
  if (highBtn) highBtn.setAttribute('aria-pressed', String(!!state.highContrast));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Storage may be unavailable (private mode) - fail silently but log in dev
    if (typeof console !== 'undefined') console.warn('Unable to persist theme to localStorage.', e);
  }
}

function initThemeManager() {
  const defaults = { lowPower: false, highContrast: false };
  let state = { ...defaults };

  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  const parsed = raw ? safeParse(raw) : null;
  if (parsed && typeof parsed === 'object') {
    state = Object.assign(state, parsed);
  }

  // Wire UI controls if present
  const lowBtn = document.getElementById('low-power-btn');
  if (lowBtn) {
    lowBtn.addEventListener('click', () => {
      state.lowPower = !state.lowPower;
      applyTheme(state);
    });
  }

  const highBtn = document.getElementById('high-contrast-btn');
  if (highBtn) {
    highBtn.addEventListener('click', () => {
      state.highContrast = !state.highContrast;
      applyTheme(state);
    });
  }

  // Initial apply
  applyTheme(state);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeManager);
  } else {
    initThemeManager();
  }
}
