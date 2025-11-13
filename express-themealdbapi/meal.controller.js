const Meal = require('./meal.model.js'); 
const MealDBService = require('./themealdbapi.service.js');

// obtener todas las recetas desde la base de datos local
async function getAllMeals(req, res) {
    try {
        const meals = await Meal.findAll();
        res.status(200).json(meals);
    } catch (error) {
        console.error('Error al obtener todas las recetas:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener recetas.' });
    }
}

// buscar receta por ID
async function getMeal(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Se requiere un ID de receta.' });
    }

    try {
        let meal = await Meal.findByPk(id);

        if (!meal) {
            console.log(`Receta ID ${id} no encontrada. Consultando TheMealDB...`);

            const newMealData = await MealDBService.getMealById(id);

            if (!newMealData || !newMealData.idMeal) {
                return res.status(404).json({ message: 'Receta no encontrada en la API.' });
            }

            const [savedMeal] = await Meal.upsert(newMealData, {
                returning: true
            });

            meal = savedMeal;

            console.log(`Receta ID ${id} guardada localmente.`);
        }

        res.status(200).json(meal);

    } catch (error) {
        console.error('Error al buscar o guardar la receta:', error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

// obtener receta al azar
async function getRandomMeal(req, res) {
    try {
        const newMealData = await MealDBService.getRandomMeal();

        // Validación extra
        if (!newMealData || !newMealData.idMeal || !newMealData.strMeal) {
            return res.status(500).json({
                message: "La API devolvió una receta inválida."
            });
        }

        const [meal] = await Meal.upsert(newMealData, {
            returning: true
        });

        console.log(`Receta random guardada correctamente: ${meal.idMeal}`);

        res.status(200).json(meal);

    } catch (error) {
        console.error('Error al obtener/guardar receta al azar:', error.message);
        res.status(500).json({ message: "Error interno al obtener receta al azar." });
    }
}

// exporta las funciones del controlador
module.exports = {
  getAllMeals,
  getMeal,
  getRandomMeal
};