const STORAGE_KEY = 'vortex_theme_config';

// State Management
const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  lowPower: false,
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

// Initial load
applyTheme();
