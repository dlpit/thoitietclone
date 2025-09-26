// Navigation JavaScript với Alpine.js
function toggleNavbar() {
    // Function này giữ lại để tương thích backwards, nhưng Alpine.js sẽ xử lý
}

function toggleDropdown(event) {
    // Function này giữ lại để tương thích backwards, nhưng Alpine.js sẽ xử lý
    event.preventDefault();
}

// Alpine.js global functions
document.addEventListener('alpine:init', () => {
    // Đóng mobile menu khi resize window về desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) { // lg breakpoint
            // Reset mobile navigation state
            Alpine.store('navigation', {
                mobileNavOpen: false,
                dropdownOpen: false
            });
        }
    });
    
    // Đóng dropdown khi click outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav[x-data]');
        if (nav && !nav.contains(e.target)) {
            Alpine.store('navigation', {
                mobileNavOpen: false,
                dropdownOpen: false
            });
        }
    });
});