const { neuralEngine } = require('./neural-engine.js'); // أو قم بتصديرها بـ CommonJS إذا لزم الأمر

console.log("--- Starting Predictive Neural Engine Test ---");

// اختبار تغيير وضع التركيز
neuralEngine.setFocusMode('deep-work');

// اختبار توليد الملخصات المعرفية التنبؤية
const sampleTopics = [
  "Optimization of AES-256-GCM Enclaves",
  "Decentralized Community Consensus Filters",
  "Cyber Glassmorphism UI Rendering Performance"
];

const digest = neuralEngine.generateDigest(sampleTopics);
console.log("Generated Neural Digest:", digest);
