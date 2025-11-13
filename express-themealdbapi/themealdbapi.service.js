const axios = require('axios'); 

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'; 

async function getMealById(id) {
    const url = `${MEALDB_BASE_URL}lookup.php?i=${id}`;

    let data;
    try {
        const res = await axios.get(url);
        data = res.data;

    } catch (error) {
        console.error("Error al conectar con TheMealDB:", error.message);
        throw new Error('No se pudo conectar con la TheMealDB API.');
    }

    if (!data.meals || data.meals.length === 0) {
        throw new Error('Receta no encontrada en TheMealDB API.');
    }

    const meal = data.meals[0];

    const finalMeal = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory || '',
        strArea: meal.strArea || '',
        strInstructions: meal.strInstructions || '',
        strMealThumb: meal.strMealThumb || 'https://i0.wp.com/ayuda.marketplace.paris.cl/wp-content/uploads/2024/02/placeholder.png?fit=1200%2C800&ssl=1'
    };

    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        
        finalMeal[ingredientKey] = meal[ingredientKey];
        finalMeal[measureKey] = meal[measureKey];
    }
    
    return finalMeal;
}


async function getRandomMeal() {
    try {
        const url = `${MEALDB_BASE_URL}random.php`; 
        const response = await axios.get(url);
      
        const meal = response.data.meals ? response.data.meals[0] : null;

        // Si la receta no existe o le faltan campos obligatorios para la DB (idMeal, strMeal)
        if (!meal || !meal.idMeal || !meal.strMeal) {
            console.error('Receta inválida obtenida al azar de TheMealDB:', response.data);
            throw new Error('La receta obtenida al azar de TheMealDB es inválida o nula.'); 
        }

        const finalMeal = {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strCategory: meal.strCategory || '',
            strArea: meal.strArea || '',
            strInstructions: meal.strInstructions || '',
            strMealThumb: meal.strMealThumb || 'https://i0.wp.com/ayuda.marketplace.paris.cl/wp-content/uploads/2024/02/placeholder.png?fit=1200%2C800&ssl=1'
        };
        
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            
            // Usamos || '' para asegurarnos que la DB reciba un string vacío si la API devolvió null
            finalMeal[ingredientKey] = meal[ingredientKey] || '';
            finalMeal[measureKey] = meal[measureKey] || '';
        }

        return finalMeal;
        
    } catch (error) {
        console.error('Error al obtener receta al azar:', error.message);
        throw error; // Propagar el error original
    }
}


module.exports = {
    getMealById,
    getRandomMeal
};