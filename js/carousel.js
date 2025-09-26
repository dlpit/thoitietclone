/**
 * Weather Carousel Component
 * AlpineJS-based carousel for hourly weather display
 */

// Weather Carousel Alpine Component
document.addEventListener('alpine:init', () => {
    Alpine.data('weatherCarousel', () => ({
        currentIndex: 0,
        totalCards: 6,
        visibleCards: 4,
        maxIndex: 2,
        autoPlay: true,
        intervalId: null,

        init() {
            this.startAutoPlay();
        },

        startAutoPlay() {
            if (this.autoPlay) {
                this.intervalId = setInterval(() => {
                    this.next();
                }, 5000);
            }
        },

        stopAutoPlay() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        next() {
            this.currentIndex = this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1;
        },

        prev() {
            this.currentIndex = this.currentIndex <= 0 ? this.maxIndex : this.currentIndex - 1;
        },

        getTranslateX() {
            return `translateX(-${this.currentIndex * 25}%)`;
        },

        // Manual navigation stops auto-play temporarily
        manualNext() {
            this.stopAutoPlay();
            this.next();
            // Restart auto-play after 10 seconds
            setTimeout(() => {
                this.startAutoPlay();
            }, 10000);
        },

        manualPrev() {
            this.stopAutoPlay();
            this.prev();
            // Restart auto-play after 10 seconds
            setTimeout(() => {
                this.startAutoPlay();
            }, 10000);
        }
    }));
});