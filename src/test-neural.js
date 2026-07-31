import { neuralEngine } from './neural-engine.js';

console.log('Running neural engine self-test...');

neuralEngine.setFocusMode('relaxed');

const sample = neuralEngine.generateDigest(['Topic A', 'Topic B', 'Topic C']);

if (!Array.isArray(sample)) {
  console.error('Self-test failed: digest is not an array');
  process.exit(1);
}

console.log('Self-test passed. Sample digest:', sample);
