import { getMealDetails } from '../api/themealdbapi.js';

function getMealIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function renderMealDetails() {
    const mainContainer = document.querySelector("main");
    const id = getMealIdFromUrl();

    if (!id) {
        mainContainer.innerHTML = "<p>No se encontró el ID de la receta en la URL.</p>";
        return;
    }
    
    mainContainer.innerHTML = `<p>Cargando detalle de la receta ID: ${id}...</p>`;

    try {
        const receta = await getMealDetails(id); 
        mainContainer.innerHTML = `
            <div class="detalle-content">
                <h1 id="receta-nombre"></h1>
                <img id="receta-imagen" src="" alt="" style="max-width: 400px;">
                <ul id="receta-carasteristicas"></ul>
                <div id="receta-ingredientes"></div>
            </div>
        `;

        document.getElementById(`receta-imagen`).src = receta.strMealThumb; 
        document.getElementById(`receta-imagen`).alt = `Imagen de ${receta.strMeal}`; 
        document.getElementById(`receta-nombre`).textContent = receta.strMeal;

        const characteristicsList = document.getElementById(`receta-carasteristicas`);
        characteristicsList.innerHTML = '';
    
        const categoryLi = document.createElement('li');
        categoryLi.textContent = `Categoría: ${receta.strCategory}`;
        characteristicsList.appendChild(categoryLi);
    
        const instructionsLi = document.createElement('li');
        instructionsLi.textContent = `Instrucciones: ${receta.strInstructions}`;
        characteristicsList.appendChild(instructionsLi);
        

        const ingredientsContainer = document.getElementById(`receta-ingredientes`);
        if (ingredientsContainer) {
            
            const ingredientsTitle = document.createElement('h3');
            ingredientsTitle.textContent = "Ingredientes";
            ingredientsContainer.appendChild(ingredientsTitle);

            const ingredientsList = document.createElement('ul');
            
            for (let i = 1; i <= 20; i++) {
                const ingredientKey = `strIngredient${i}`;
                const measureKey = `strMeasure${i}`;

                const ingredient = receta[ingredientKey];
                const measure = receta[measureKey];

                if (ingredient && ingredient.trim() !== '') {
                    const listItem = document.createElement('li');

                    const fullIngredient = (measure ? measure.trim() : '') + ' ' + ingredient.trim();
                    listItem.textContent = fullIngredient;
                    
                    ingredientsList.appendChild(listItem);
                }
            }
            ingredientsContainer.appendChild(ingredientsList);
        }

    } catch (error) {
        console.error('Error al cargar la receta:', error);
        mainContainer.innerHTML = `<p style="color: red;">Error al cargar el detalle: ${error.message}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", renderMealDetails);