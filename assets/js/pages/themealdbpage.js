import { getRandomMeal } from '../api/themealdbapi.js';
import { truncateText } from '../api/utils.js';

// Función principal para renderizar las 10 recetas
async function renderTenMeals() {
    
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`receta-nombre-${i}`).textContent = 'Cargando...';
        document.getElementById(`receta-imgen-${i}`).src = 'https://placehold.co/160x160/fef3c7/d97706?text=...';
    }

    const mealPromises = [];
    for (let i = 0; i < 10; i++) {
        mealPromises.push(getRandomMeal());
    }

    const allMeals = await Promise.all(mealPromises);

    allMeals.forEach((meal, index) => {
        const cardIndex = index + 1;
        
        if (meal) {
            document.getElementById(`receta-imgen-${cardIndex}`).src = meal.strMealThumb;
            document.getElementById(`receta-imgen-${cardIndex}`).alt = `Imagen de ${meal.strMeal}`;
            document.getElementById(`receta-nombre-${cardIndex}`).textContent = meal.strMeal;

            const characteristicsList = document.getElementById(`receta-carasteristicas-${cardIndex}`);
            characteristicsList.innerHTML = '';

            const categoryLi = document.createElement('li');
            categoryLi.textContent = `Categoría: ${meal.strCategory}`;
            characteristicsList.appendChild(categoryLi);

            const instructionsLi = document.createElement('li');
            instructionsLi.textContent = `Instrucciones: ${truncateText(meal.strInstructions, 70)}`;
            characteristicsList.appendChild(instructionsLi);

            const recetaCard = document.getElementById(`receta-${cardIndex}`);
            if (recetaCard) {
                recetaCard.replaceWith(recetaCard.cloneNode(true));
                const newCard = document.getElementById(`receta-${cardIndex}`);
                
                newCard.style.cursor = 'pointer';
                newCard.addEventListener('click', () => {
                    window.location.href = `recetadetalle.html?id=${meal.idMeal}`;
                });
            }
        } else {
            document.getElementById(`receta-nombre-${cardIndex}`).textContent = 'Error';
            document.getElementById(`receta-imgen-${cardIndex}`).src = 'https://placehold.co/160x160/fef3c7/d97706?text=Error';
            document.getElementById(`receta-carasteristicas-${cardIndex}`).innerHTML = '<li>No se pudo cargar la información.</li>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('btn-refrescar');
    refreshButton.addEventListener('click', renderTenMeals);
    renderTenMeals();
});