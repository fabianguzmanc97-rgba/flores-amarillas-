document.addEventListener('DOMContentLoaded', () => {
    // 1. Control de Audio Ambiente
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = document.getElementById('audioIcon');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    function toggleAudio() {
        if (isPlaying) {
            bgMusic.pause();
            audioIcon.textContent = '🎵';
        } else {
            bgMusic.play().then(() => {
                audioIcon.textContent = '🔊';
            }).catch(() => {});
        }
        isPlaying = !isPlaying;
    }

    audioToggle.addEventListener('click', toggleAudio);
    
    // Reproducción al primer toque en la pantalla (requisito de los móviles)
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                audioIcon.textContent = '🔊';
                isPlaying = true;
            }).catch(() => {});
        }
    }, { once: true });

    // 2. Sistema de Partículas Canvas (Efecto Polvo de Oro y Pétalos)
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 40;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 6 + 3;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.6 + 0.3;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * 0.01) + this.speedX;
            this.rotation += this.rotSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;

            // Forma de pétalo/brillo dorado
            ctx.fillStyle = '#fbc02d';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height; // Distribución inicial uniforme
        particles.push(p);
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 3. Modal Visor para Ampliar Fotos al Hacer Clic
    const flowers = document.querySelectorAll('.flower-node');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementById('closeModal');

    flowers.forEach(flower => {
        flower.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = flower.querySelector('img');
            if (img) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
