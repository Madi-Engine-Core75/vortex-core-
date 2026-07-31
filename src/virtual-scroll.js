// src/virtual-scroll.js
export class VirtualScroll {
    constructor(containerId, itemHeight, totalItems, renderCallback) {
        this.container = document.getElementById(containerId);
        this.itemHeight = itemHeight; // ارتفاع العنصر التقريبي بالبكسل
        this.totalItems = totalItems;
        this.renderCallback = renderCallback;
        
        this.viewportHeight = this.container.clientHeight;
        this.visibleCount = Math.ceil(this.viewportHeight / this.itemHeight) + 2; // هامش أمان إضافي
        
        this.spacer = document.createElement('div');
        this.spacer.style.height = `${this.totalItems * this.itemHeight}px`;
        this.spacer.style.position = 'relative';
        this.container.innerHTML = '';
        this.container.appendChild(this.spacer);

        this.contentContainer = document.createElement('div');
        this.contentContainer.style.position = 'absolute';
        this.contentContainer.style.top = '0';
        this.contentContainer.style.left = '0';
        this.contentContainer.style.right = '0';
        this.spacer.appendChild(this.contentContainer);

        this.container.addEventListener('scroll', () => this.onScroll());
        this.update(0);
    }

    onScroll() {
        const scrollTop = this.container.scrollTop;
        const startIndex = Math.floor(scrollTop / this.itemHeight);
        this.update(startIndex);
    }

    update(startIndex) {
        const start = Math.max(0, startIndex - 1);
        const end = Math.min(this.totalItems, start + this.visibleCount);
        
        const offsetY = start * this.itemHeight;
        this.contentContainer.style.transform = `translateY(${offsetY}px)`;

        let html = '';
        for (let i = start; i < end; i++) {
            html += this.renderCallback(i);
        }
        this.contentContainer.innerHTML = html;
    }
}
