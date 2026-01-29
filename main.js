/**
 * TMVC Website - Core UI Logic
 * Handles common interface interactions: Theme Switching, Header Scroll, and Mobile Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switching Logic
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            sessionStorage.setItem('theme', newTheme);
        });
    }

    // 2. Header Scroll Behavior (Hide/Show on scroll)
    const header = document.getElementById('mainHeader');
    if (header) {
        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Basic Scrolled State (for background blur/color)
            if (currentScroll > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Hide/Show logic
            if (currentScroll <= 0) {
                header.classList.remove('header-hidden');
                return;
            }

            if (currentScroll > lastScroll && currentScroll > scrollThreshold && !document.body.classList.contains('nav-active')) {
                // Scrolling down - Hide
                header.classList.add('header-hidden');
            } else {
                // Scrolling up - Show
                header.classList.remove('header-hidden');
            }
            lastScroll = currentScroll;
        });
    }

    // 3. Mobile Navigation Menu
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('#navMenu a');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-active');
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            document.body.classList.remove('nav-active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-active');
        });
    });
});
