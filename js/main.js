import { initCursor } from './cursor.js';
import { initShaderBg } from './shaderBg.js';
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.16.2/+esm";

console.log("Portfolio Loaded");

// Initialize Modules
initCursor();
initShaderBg();

// Typewriter Effect
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = 1; // Ensure visible for typing
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Speed
        }
    }
    // Start after a slight delay
    setTimeout(typeWriter, 1000);
}

// Scroll Animations
inView('.animate-on-scroll', ({ target }) => {
    animate(
        target,
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.8, easing: "ease-out" }
    );
});

// Staggered list items (e.g. skills)
inView('#skills', ({ target }) => {
    animate(
        target.querySelectorAll('.tag'),
        { opacity: [0, 1], scale: [0.8, 1] },
        { delay: stagger(0.05), duration: 0.5 }
    );
});

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Check local storage
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
