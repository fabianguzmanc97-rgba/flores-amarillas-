document.addEventListener('DOMContentLoaded', () => {
    // 1. Generar pétalos cayendo suavemente al fondo
    const petalsContainer = document.getElementById('petalsContainer');
    const petalCount = 20;

    if (petalsContainer) {
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('falling-petal');
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${5 + Math.random() * 5}s`;
            petal.style.animationDelay = `${Math.random() * 5}s`;
            petalsContainer.appendChild(petal);
        }
    }

    // 2. Efecto de aumento y leve resplandor al hacer clic o tocar cada flor
    const flowers = document.querySelectorAll('.sunflower');

    flowers.forEach(flower => {
        flower.addEventListener('click', () => {
            flower.style.transform = 'scale(1.25)';
            flower.style.zIndex = '20';

            setTimeout(() => {
                flower.style.transform = '';
                flower.style.zIndex = '';
            }, 600);
        });
    });
});
