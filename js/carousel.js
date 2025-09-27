/**
 * Weather Carousel Component
 * AlpineJS-based carousel for hourly weather display
 */

// Weather Carousel Alpine Component
document.addEventListener('alpine:init', () => {
    Alpine.data('weatherCarousel', (config = {}) => ({
        currentIndex: 0,
        totalCards: config.totalCards ?? 6,
        visibleCards: config.visibleCards ?? 4,
        autoPlay: config.autoPlay ?? true,
        intervalId: null,
        resumeTimeoutId: null,

        init() {
            this.applyConfig(config);
            this.startAutoPlay();

            this.$watch('totalCards', () => this.ensureIndexInRange());
            this.$watch('visibleCards', () => this.ensureIndexInRange());
        },

        applyConfig(configOverrides = {}) {
            if (typeof configOverrides.totalCards === 'number') {
                this.totalCards = configOverrides.totalCards;
            }
            if (typeof configOverrides.visibleCards === 'number') {
                this.visibleCards = configOverrides.visibleCards;
            }
            if (typeof configOverrides.autoPlay === 'boolean') {
                this.autoPlay = configOverrides.autoPlay;
            }
            this.ensureIndexInRange();
        },

        ensureIndexInRange() {
            const maxIndex = this.getMaxIndex();
            if (this.currentIndex > maxIndex) {
                this.currentIndex = maxIndex;
            }
        },

        getMaxIndex() {
            const max = this.totalCards - this.visibleCards;
            return max > 0 ? max : 0;
        },

        getCardWidth() {
            return 100 / this.visibleCards;
        },

        startAutoPlay() {
            if (!this.autoPlay || this.getMaxIndex() === 0 || this.intervalId) {
                return;
            }
            this.intervalId = setInterval(() => {
                this.next();
            }, 5000);
        },

        stopAutoPlay() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            if (this.resumeTimeoutId) {
                clearTimeout(this.resumeTimeoutId);
                this.resumeTimeoutId = null;
            }
        },

        scheduleAutoPlayResume() {
            if (!this.autoPlay || this.getMaxIndex() === 0) {
                return;
            }
            this.resumeTimeoutId = setTimeout(() => {
                this.startAutoPlay();
            }, 10000);
        },

        next() {
            const maxIndex = this.getMaxIndex();
            if (maxIndex === 0) {
                this.currentIndex = 0;
                return;
            }
            this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
        },

        prev() {
            const maxIndex = this.getMaxIndex();
            if (maxIndex === 0) {
                this.currentIndex = 0;
                return;
            }
            this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
        },

        getTranslateX() {
            return `translateX(-${this.currentIndex * this.getCardWidth()}%)`;
        },

        // Manual navigation stops auto-play temporarily
        manualNext() {
            this.stopAutoPlay();
            this.next();
            this.scheduleAutoPlayResume();
        },

        manualPrev() {
            this.stopAutoPlay();
            this.prev();
            this.scheduleAutoPlayResume();
        }
    }));
});