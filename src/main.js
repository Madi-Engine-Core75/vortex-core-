import { neuralEngine } from './neural-engine.js';

console.log("--- Vortex-Core Social Platform Initialized ---");

// تشغيل وتفعيل المحرك العصبي في وضع العمل العميق
neuralEngine.setFocusMode('deep-work');

const activeTopics = [
  "Optimization of AES-256-GCM Enclaves",
  "Decentralized Community Consensus Filters",
  "Cyber Glassmorphism UI Rendering Performance"
];

const digest = neuralEngine.generateDigest(activeTopics);
console.log("Generated Neural Digest:", digest);

// حقن النتائج داخل واجهة المستخدم العقدية
const container = document.getElementById('neural-digest-container');
if (container) {
  container.innerHTML = digest.map(item => `
    <div class="digest-item">
      <strong>${item.title}</strong>
      <span class="digest-score">Score: ${item.priorityScore}</span>
    </div>
  `).join('');
}
