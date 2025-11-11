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

    return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strMealThumb: meal.strMealThumb
    };
}

module.exports = {
    getMealById
};