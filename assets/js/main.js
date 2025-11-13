import { getPokemon } from './api/pokeapi.js';
import { getRandomMeal } from './api/themealdbapi.js';
import { getStarWarsCharacter } from './api/starwarsapi.js';
import { getRandomCatImage } from './api/thecatapi.js';
import { capitalizeFirstLetter } from './api/utils.js';


async function renderPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; 
    const pokemon = await getPokemon(randomId.toString());

    if (pokemon) {
        document.getElementById('poke-imgen').src = pokemon.image;
        document.getElementById('poke-imgen').alt = `Imagen de ${pokemon.name}`;
        
        const capitalizedName = capitalizeFirstLetter(pokemon.name);
        document.getElementById('poke-nombre').textContent = capitalizedName;

        const characteristicsList = document.getElementById('poke-carasteristicas');
        characteristicsList.innerHTML = '';

        if (pokemon.types && pokemon.types.length > 0) {
            const typeItem = document.createElement('li');
            typeItem.textContent = `Tipo: ${capitalizeFirstLetter(pokemon.types[0])}`;
            characteristicsList.appendChild(typeItem);
        }

        if (pokemon.abilities && pokemon.abilities.length > 0) {
            const abilityItem = document.createElement('li');
            abilityItem.textContent = `Habilidad: ${capitalizeFirstLetter(pokemon.abilities[0])}`;
            characteristicsList.appendChild(abilityItem);
        }

        localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
        const pokemonCard = document.getElementById("pokemon-del-dia");
        pokemonCard.addEventListener("click", () => {
            window.location.href = "pages/pokemondetalle.html";

        });
    } else {
        document.getElementById('pokemon-del-dia').innerHTML = '<p>No se pudo cargar el Pokémon.</p>';
    }
}

async function renderMeal() {
    try {
        const meal = await getRandomMeal();
        
        if (meal) {
            document.getElementById('receta-imgen').src = meal.strMealThumb; 
            document.getElementById('receta-imgen').alt = `Imagen de la receta de ${meal.strMeal}`; 
            document.getElementById('receta-nombre').textContent = meal.strMeal;
            
            const characteristicsList = document.getElementById('receta-carasteristicas');
            characteristicsList.innerHTML = '';
            
            const listItem1 = document.createElement('li');
            listItem1.textContent = `Categoría: ${meal.strCategory}`;
            characteristicsList.appendChild(listItem1);

            const listItem2 = document.createElement('li');
            const instructions = meal.strInstructions && meal.strInstructions.length > 50 
                ? meal.strInstructions.substring(0, 50) + '...' 
                : meal.strInstructions || 'Sin instrucciones';
            listItem2.textContent = `Instrucciones: ${instructions}`;
            characteristicsList.appendChild(listItem2);

            const mealCard = document.getElementById("receta-del-dia");
            
            const newMealCard = mealCard.cloneNode(true);
            mealCard.replaceWith(newMealCard);
            
            newMealCard.addEventListener("click", () => {
                window.location.href = `pages/recetadetalle.html?id=${meal.idMeal}`; 
            });
        } else {
            document.getElementById('receta-del-dia').innerHTML = '<p>No se pudo cargar la receta.</p>';
        }
    } catch (error) {
        console.error('Error cargando receta:', error);
        document.getElementById('receta-del-dia').innerHTML = '<p>Error al cargar la receta.</p>';
    }
}

async function renderStarWarsCharacter() {
    try {
        const randomId = Math.floor(Math.random() * 82) + 1;
        const character = await getStarWarsCharacter(randomId);

    if (character) {
        document.getElementById('star-wars-nombre').textContent = character.name;

        const characteristicsList = document.getElementById('star-wars-carasteristicas');
        characteristicsList.innerHTML = '';

        const listItem1 = document.createElement('li');
        listItem1.textContent = `Altura: ${character.height} cm`;
        characteristicsList.appendChild(listItem1);

        const listItem2 = document.createElement('li');
        listItem2.textContent = `Año de nacimiento: ${character.birth_year}`;
        characteristicsList.appendChild(listItem2);

        localStorage.setItem("selectedStarWarsCharacter", JSON.stringify(character));
        const starWarsCard = document.getElementById("star-wars-del-dia");
        starWarsCard.addEventListener("click", () => {
            window.location.href = "pages/starwarsdetalle.html";

        });
        } else {
            document.getElementById('star-wars-del-dia').innerHTML = '<p>No se pudo cargar el personaje.</p>';
        }
    } catch (error) {
        console.error('Error cargando personaje Star Wars:', error);
        document.getElementById('star-wars-del-dia').innerHTML = '<p>Error al cargar el personaje.</p>';
    }
}

async function renderCatImage() {
    try {
        const cat = await getRandomCatImage();

    if (cat) {
        document.getElementById('gato-imgen').src = cat.url;
        document.getElementById('gato-imgen').alt = `Imagen de un gato con ID ${cat.id}`;
        document.getElementById('gato-nombre').textContent = `ID: ${cat.id}`;
        
        const characteristicsList = document.getElementById('gato-carasteristicas');
        characteristicsList.innerHTML = '';
        
        const listItem1 = document.createElement('li');
        listItem1.textContent = "Un adorable compañero.";

        const listItem2 = document.createElement('li');
        listItem2.textContent = `Raza: ${cat.breed}`;
        
        characteristicsList.appendChild(listItem2);
        characteristicsList.appendChild(listItem1);

         //guardar gato en localstorage
        localStorage.setItem("selectedCat", JSON.stringify(cat));

        //hacer click en la tarjeta
        const catCard = document.getElementById("Gatos-del-Dia");
        catCard.addEventListener("click", () => {
            window.location.href = "pages/gatosdetalle.html";
        });

        } else {
            document.getElementById('Gatos-del-Dia').innerHTML = '<p>No se pudo cargar la imagen del gato.</p>';
        }
    } catch (error) {
        console.error('Error cargando gato:', error);
        document.getElementById('Gatos-del-Dia').innerHTML = '<p>Error al cargar el gato.</p>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderPokemon();
    renderMeal();
    renderStarWarsCharacter();
    renderCatImage();
});

//Menú movil
const btn = document.getElementById('dropdown-btn');
const menu = document.getElementById('dropdown-menu');

btn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('show');
});

window.addEventListener('click', () => {
  menu.classList.remove('show'); //cierra si clic afuera
});