const Meal = require('./meal.model.js'); 
const { getMealById } = require('./themealdbapi.service.js');

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
        // Buscar primero en la BD local
        let meal = await Meal.findByPk(id);

        if (!meal) {
            console.log(`Receta con ID ${id} no encontrada localmente. Buscando en TheMealDB...`);
            
            // Obtenerlo de TheMealDB API
            const newMealData = await getMealById(id); 
            const [createdMeal, created] = await Meal.upsert(newMealData, {
                returning: true,
                fields: Object.keys(newMealData)
            });
            
            meal = createdMeal;
            console.log(`Receta ID ${id} guardada en la base de datos local.`);
        }

        res.status(200).json(meal);
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            return res.status(404).json({ message: error.message });
        }
        console.error('Error al buscar o guardar la receta:', error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

// exporta las funciones del controlador
module.exports = {
  getAllMeals,
  getMeal,
};