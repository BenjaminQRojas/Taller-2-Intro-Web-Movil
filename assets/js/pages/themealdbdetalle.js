document.addEventListener("DOMContentLoaded", () => {
    const recetasData = localStorage.getItem("selectedReceta");

    if (!recetasData) {
        document.querySelector("main").innerHTML = "<p>No se encontró información de la receta.</p>";
    return;
}
    const receta = JSON.parse(recetasData);

    // Renderizar en la página de detalle
    document.getElementById(`receta-imagen`).src = receta.image;
    document.getElementById(`receta-imagen`).alt = `Imagen de ${receta.name}`;
    document.getElementById(`receta-nombre`).textContent = receta.name;

    const characteristicsList = document.getElementById(`receta-carasteristicas`);
    characteristicsList.innerHTML = '';
  
    const categoryLi = document.createElement('li');
    categoryLi.textContent = `Categoría: ${receta.category}`;
    characteristicsList.appendChild(categoryLi);
  
    const instructionsLi = document.createElement('li');
    instructionsLi.textContent = `Instrucciones: ${receta.instructions}`;
    characteristicsList.appendChild(instructionsLi);

    //logica ingredientes
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
});
