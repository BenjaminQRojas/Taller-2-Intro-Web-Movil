import { getStarWarsCharacter } from '../api/starwarsapi.js';
import { capitalizeFirstLetter } from '../api/utils.js';

// Función principal para renderizar los 10 personajes de Star Wars
async function renderTenStarWarsCharacters() {
    
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`starwars-nombre-${i}`).textContent = 'Cargando...';
    }

    const characterPromises = [];
    for (let i = 0; i < 10; i++) {
        const randomId = Math.floor(Math.random() * 82) + 1;
        characterPromises.push(getStarWarsCharacter(randomId));
    }

    const allCharacters = await Promise.all(characterPromises);

    allCharacters.forEach((character, index) => {
        const cardIndex = index + 1;
        
        if (character) {
            document.getElementById(`starwars-nombre-${cardIndex}`).textContent = character.name;
            document.getElementById(`starwars-imgen-${cardIndex}`).src = '../assets/images/default_starwars_profile_picture.jpg';
            document.getElementById(`starwars-imgen-${cardIndex}`).alt = `Imagen de ${character.name}`;

            const characteristicsList = document.getElementById(`starwars-carasteristicas-${cardIndex}`);
            characteristicsList.innerHTML = '';

            const heightLi = document.createElement('li');
            heightLi.textContent = `Altura: ${character.height || 'Desconocida'}`;
            characteristicsList.appendChild(heightLi);

            const birth_yearLi = document.createElement('li');
            birth_yearLi.textContent = `Año de nacimiento: ${character.birth_year || 'Desconocido'}`;
            characteristicsList.appendChild(birth_yearLi);

            // Hacer la card clickeable
            const starWarsCard = document.getElementById(`starwars-${cardIndex}`);
            if (starWarsCard) {
                // Remover listeners previos para evitar duplicados
                starWarsCard.replaceWith(starWarsCard.cloneNode(true));
                const newCard = document.getElementById(`starwars-${cardIndex}`);
                
                newCard.style.cursor = 'pointer';
                newCard.addEventListener('click', () => {
                    localStorage.setItem("selectedStarWarsCharacter", JSON.stringify(character));
                    window.location.href = "starwarsdetalle.html";
                });
            }

        } else {
            document.getElementById(`starwars-nombre-${cardIndex}`).textContent = 'Error';
            document.getElementById(`starwars-imgen-${cardIndex}`).src = '../assets/images/default_starwars_profile_picture.jpg';
            document.getElementById(`starwars-carasteristicas-${cardIndex}`).innerHTML = '<li>No se pudo cargar la información.</li>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('btn-refrescar');
    refreshButton.addEventListener('click', renderTenStarWarsCharacters);
    renderTenStarWarsCharacters();
});

/*
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('dropdown-open');
});*/