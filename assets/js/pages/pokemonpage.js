import { getPokemon } from '../api/pokeapi.js';
import { capitalizeFirstLetter } from '../api/utils.js';


// Función principal para renderizar los 10 Pokémon
async function renderTenPokemon() {
    
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`poke-nombre-${i}`).textContent = 'Cargando...';
        document.getElementById(`poke-imgen-${i}`).src = 'https://placehold.co/160x160/e2e8f0/94a3b8?text=...';
    }

    const pokemonPromises = [];
    for (let i = 0; i < 10; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        pokemonPromises.push(getPokemon(randomId.toString()));
    }

    const allPokemon = await Promise.all(pokemonPromises);

    allPokemon.forEach((pokemon, index) => {
        const cardIndex = index + 1;
        
        if (pokemon) {
            document.getElementById(`poke-imgen-${cardIndex}`).src = pokemon.image;
            document.getElementById(`poke-imgen-${cardIndex}`).alt = `Imagen de ${pokemon.name}`;
            document.getElementById(`poke-nombre-${cardIndex}`).textContent = capitalizeFirstLetter(pokemon.name);

            const characteristicsList = document.getElementById(`poke-carasteristicas-${cardIndex}`);
            characteristicsList.innerHTML = '';

            const typeLi = document.createElement('li');
            typeLi.textContent = `Tipos: ${pokemon.types && pokemon.types.length > 0 ? pokemon.types.map(type => capitalizeFirstLetter(type)).join(", ") : "Desconocidos"}`;
            characteristicsList.appendChild(typeLi);

            /*

    const li3 = document.createElement("li");
    li3.textContent = `Tipos: ${pokemon.types && pokemon.types.length > 0 ? pokemon.types.map(type => capitalizeFirstLetter(type)).join(", ") : "Desconocidos"}`;

        */

            // Mostrar habilidades si están disponibles
            if (pokemon.abilities && pokemon.abilities.length > 0) {
                const abilityLi = document.createElement('li');
                const randomAbility = pokemon.abilities[Math.floor(Math.random() * pokemon.abilities.length)];
                abilityLi.textContent = `Habilidad: ${capitalizeFirstLetter(randomAbility)}`;
                characteristicsList.appendChild(abilityLi);
            }

            // Hacer la card clickeable
            const pokemonCard = document.getElementById(`pokemon-${cardIndex}`);
            if (pokemonCard) {
                // Remover listeners previos para evitar duplicados
                pokemonCard.replaceWith(pokemonCard.cloneNode(true));
                const newCard = document.getElementById(`pokemon-${cardIndex}`);
                
                newCard.style.cursor = 'pointer';
                newCard.addEventListener('click', () => {
                    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
                    window.location.href = "pokemondetalle.html";
                });
            }
        } else {
            document.getElementById(`poke-nombre-${cardIndex}`).textContent = 'Error';
            document.getElementById(`poke-imgen-${cardIndex}`).src = 'https://placehold.co/160x160/e2e8f0/94a3b8?text=Error';
            document.getElementById(`poke-carasteristicas-${cardIndex}`).innerHTML = '<li>No se pudo cargar la información.</li>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('btn-refrescar');
    refreshButton.addEventListener('click', renderTenPokemon);
    renderTenPokemon();
});

/*
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('dropdown-open');
});*/