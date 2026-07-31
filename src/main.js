import { neuralEngine } from './neural-engine.js';

console.log('--- Vortex-Core Social Platform Initialized ---');

// Initialize neural engine in deep-work mode by default
neuralEngine.setFocusMode('deep-work');

const activeTopics = [
  'Optimization of AES-256-GCM Enclaves',
  'Decentralized Community Consensus Filters',
  'Cyber Glassmorphism UI Rendering Performance',
];

const digest = neuralEngine.generateDigest(activeTopics);
console.log('Generated Neural Digest:', digest);

// Inject results into the UI in an accessible structure
const container = document.getElementById('neural-digest-container');
if (container) {
  container.innerHTML = digest
    .map(
      (item) => `
    <div class="digest-item" role="article" aria-label="Digest item: ${item.title}">
      <div>
        <strong>${item.title}</strong>
        <div class="muted" style="font-size:0.85rem">${new Date(item.timestamp).toLocaleString()}</div>
      </div>
      <div class="digest-score" aria-hidden="true">Score: ${item.priorityScore}</div>
    </div>
  `
    )
    .join('');
}

// Theme toggles (low-power / high-contrast) — keep lightweight and optional
const lowPowerBtn = document.getElementById('toggle-low-power');
const highContrastBtn = document.getElementById('toggle-high-contrast');

function setBodyClass(cls, enabled) {
  const body = document.body;
  if (enabled) body.classList.add(cls);
  else body.classList.remove(cls);
}

if (lowPowerBtn) {
  const saved = localStorage.getItem('madi_low_power') === '1';
  setBodyClass('low-power', saved);
  lowPowerBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
  lowPowerBtn.addEventListener('click', () => {
    const isOn = document.body.classList.toggle('low-power');
    localStorage.setItem('madi_low_power', isOn ? '1' : '0');
    lowPowerBtn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  });
}

if (highContrastBtn) {
  const saved = localStorage.getItem('madi_high_contrast') === '1';
  setBodyClass('high-contrast', saved);
  highContrastBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
  highContrastBtn.addEventListener('click', () => {
    const isOn = document.body.classList.toggle('high-contrast');
    localStorage.setItem('madi_high_contrast', isOn ? '1' : '0');
    highContrastBtn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  });
}

// Respect prefers-reduced-motion for in-page animations
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduced-motion');
}
