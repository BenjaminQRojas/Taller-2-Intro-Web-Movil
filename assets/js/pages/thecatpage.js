import { getRandomCatImage } from '../api/thecatapi.js';
import { capitalizeFirstLetter } from '../api/utils.js';

// Función principal para renderizar las 10 imágenes de gatos
async function renderTenCats() {
    
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`gato-nombre-${i}`).textContent = 'Cargando...';
        document.getElementById(`gato-imgen-${i}`).src = 'https://placehold.co/160x160/f3e8ff/c084fc?text=...';
    }

    async function fetchCatWithRetry(maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const cat = await getRandomCatImage();
                if (cat) return cat;
            } catch (error) {
                console.warn(`Intento ${attempt} fallido al cargar gato`, error);
            }
        }
        return null;
    }

    const catPromises = [];
    for (let i = 0; i < 10; i++) {
        catPromises.push(fetchCatWithRetry(3));
    }
    const allCats = await Promise.all(catPromises);


    allCats.forEach((cat, index) => {
        const cardIndex = index + 1;
        
        if (cat) {
            document.getElementById(`gato-imgen-${cardIndex}`).src = cat.url;
            document.getElementById(`gato-imgen-${cardIndex}`).alt = `Imagen de un gato con ID ${cat.id}`;
            document.getElementById(`gato-nombre-${cardIndex}`).textContent = `ID: ${cat.id}`;

            const characteristicsList = document.getElementById(`gato-carasteristicas-${cardIndex}`);
            characteristicsList.innerHTML = '';

            const breedLi = document.createElement('li');
            breedLi.textContent = `Raza: ${cat.breed || 'Desconocida'}`;
            characteristicsList.appendChild(breedLi);

            const card = document.getElementById(`gato-${cardIndex}`);
            if (card) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    const gatoSeleccionado = {
                        id: cat.id,
                        url: cat.url,
                        breed: cat.breed || 'Desconocida',
                        name: `ID: ${cat.id}`
                    };

                    localStorage.setItem("selectedCat", JSON.stringify(gatoSeleccionado));
                    window.location.href = "gatosdetalle.html";
                });
            }
   
        } else {
            document.getElementById(`gato-nombre-${cardIndex}`).textContent = 'Error';
            document.getElementById(`gato-imgen-${cardIndex}`).src = 'https://placehold.co/160x160/f3e8ff/c084fc?text=Error';
            document.getElementById(`gato-carasteristicas-${cardIndex}`).innerHTML = '<li>No se pudo cargar la información.</li>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('btn-refrescar');
    refreshButton.addEventListener('click', renderTenCats);
    renderTenCats();
});

/*
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('dropdown-open');
});*/