
export function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 80;
    const connectionDistance = 150;
    const particleSpeed = 0.5;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            // Color based on theme (read computed style)
            const color = getComputedStyle(document.body).getPropertyValue('--text-primary').trim();
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        
        const color = getComputedStyle(document.body).getPropertyValue('--text-primary').trim();
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.globalAlpha = 1 - (dist / connectionDistance);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    init();
}
