// Weather Days Alpine.js Component
function weatherDaysComponent() {
    return {
        openDetails: {},
        
        toggleDay(dayIndex) {
            this.openDetails[dayIndex] = !this.openDetails[dayIndex];
        },
        
        isDayOpen(dayIndex) {
            return !!this.openDetails[dayIndex];
        }
    }
}