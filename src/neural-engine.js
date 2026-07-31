/**
 * Vortex-Core: Predictive Neural Engagement Module
 * Manages smart summaries and focus-driven user triggers.
 *
 * Notes:
 * - Non-breaking refactor: comments and small validation added.
 * - Focus modes supported: 'deep-work', 'relaxed', 'balanced'.
 */

class NeuralEngagementEngine {
  constructor() {
    this.userFocusState = 'balanced'; // allowed: 'deep-work', 'relaxed', 'balanced'
    this.activeTriggers = [];
  }

  /**
   * Set the user focus mode with validation.
   * @param {string} mode
   */
  setFocusMode(mode) {
    const allowed = ['deep-work', 'relaxed', 'balanced'];
    this.userFocusState = allowed.includes(mode) ? mode : 'balanced';
    console.info(`[NeuralEngine] Focus mode set to: ${this.userFocusState}`);
    this.adjustNotifications();
  }

  adjustNotifications() {
    if (this.userFocusState === 'deep-work') {
      console.info('[NeuralEngine] Muting non-critical streams; prioritizing high-priority summaries.');
    } else {
      console.info('[NeuralEngine] Standard neural engagement active.');
    }
  }

  /**
   * Generate a simple predictive digest from topics
   * Returns an array sorted by priorityScore desc.
   * @param {string[]} topics
   */
  generateDigest(topics = []) {
    console.info('[NeuralEngine] Compiling predictive digest...');
    return topics
      .map((topic) => ({
        title: topic,
        priorityScore: Math.floor(Math.random() * 50) + 50,
        timestamp: new Date().toISOString(),
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }
}

// Export a single shared instance
export const neuralEngine = new NeuralEngagementEngine();
