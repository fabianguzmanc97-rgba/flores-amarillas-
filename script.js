document.addEventListener('DOMContentLoaded', () => {
    const flowers = document.querySelectorAll('.flower-node');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementById('closeModal');

    // 1. Crear pétalos flotantes cayendo suavemente al fondo
    const petalsContainer = document.getElementById('petalsContainer');
    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('falling-petal');
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${6 + Math.random() * 6}s`;
        petal.style.animationDelay = `${Math.random() * 6}s`;
        petalsContainer.appendChild(petal);
    }

    // 2. Abrir foto ampliada al hacer clic en cualquiera de las flores
    flowers.forEach(flower => {
        flower.addEventListener('click', () => {
            const img = flower.querySelector('img');
            if (img) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
            }
        });
    });

    // Cerrar el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});