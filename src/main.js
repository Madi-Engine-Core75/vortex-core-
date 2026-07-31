import { VirtualScroll } from './virtual-scroll.js';

// مثال على تفعيل العرض التكيفي لقائمة ضخمة تضم 10,000 عنصر دون أي ضغط على الرام
document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('neural-digest-container');
    if (feedContainer) {
        feedContainer.style.height = '400px';
        feedContainer.style.overflowY = 'auto';
        feedContainer.id = 'virtual-feed';

        new VirtualScroll('virtual-feed', 70, 10000, (index) => {
            return `
                <div class="vortex-card" style="height: 60px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
                    <span>Encrypted Node Item #${index}</span>
                    <span style="color: var(--teal-glow, #00f2fe);">ACTIVE</span>
                </div>
            `;
        });
    }
});
