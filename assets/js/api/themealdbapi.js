import { fetchData } from './fetch.js';

export async function getRandomMeal() {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    const mealData = await fetchData(url);

    if (mealData && mealData.meals) {
        const meal = mealData.meals[0];
        const finalMeal = {
            name: meal.strMeal,
            image: meal.strMealThumb, 
            category: meal.strCategory,
            instructions: meal.strInstructions
        };
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            finalMeal[ingredientKey] = meal[ingredientKey];
            finalMeal[measureKey] = meal[measureKey];
        }
        return finalMeal;
    }
    return null;
}