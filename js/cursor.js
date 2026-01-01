
export function initCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (!cursorDot || !cursorOutline) return;

    // Center cursor based on dimensions
    const outlineSize = 40;
    const dotSize = 8;

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        // transform is more performant than top/left
        cursorDot.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
        
        // Outline follows with slight delay handled by CSS transition or optimized JS
        // Using animate for smooth trailing without layout thrashing
        cursorOutline.animate({
            transform: `translate(${posX}px, ${posY}px) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects - Links & Interactive
    const links = document.querySelectorAll('a, button, input[type="submit"], .hover-trigger');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'transparent';
            cursorOutline.style.backgroundColor = 'rgba(var(--text-primary), 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--text-primary)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Hide custom cursor on text to allow selection
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, input, textarea');
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = 0;
            cursorOutline.style.opacity = 0;
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
        });
    });
}
