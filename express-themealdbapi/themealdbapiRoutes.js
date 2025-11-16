// themealdbapiRoutes.js (AJUSTA LOS @returns)
const express = require('express');
const { getAllMeals, getMeal, getRandomMeal } = require('./meal.controller.js');
const router = express.Router();
// ...

/**
 * Obtiene todas las comidas de la base de datos local.
 * @route GET /
 * @group Comidas - Operaciones de listado y búsqueda.
 * @returns {object} 200 - Respuesta exitosa con una lista de comidas.
 * @returns {object} 500 - Error interno del servidor.
 * @model {ListaComidas} 200
 * @model {ErrorResponse} 500
 */
router.get('/', getAllMeals); 

/**
 * Obtiene una comida al azar de la base de datos.
 * @route GET /random
 * @group Comidas
 * @returns {object} 200 - Respuesta exitosa con una comida individual.
 * @returns {object} 500 - Error interno del servidor.
 * @model {Comida} 200
 * @model {ErrorResponse} 500
 */
router.get('/random', getRandomMeal);

/**
 * Obtiene los detalles de una comida específica usando su ID.
 * @route GET /{id}
 * @group Comidas
 * @param {string} id.path.required - El ID de la comida a buscar (ej: 52855).
 * @returns {object} 200 - Respuesta exitosa con los detalles de la comida.
 * @returns {object} 404 - Comida no encontrada.
 * @model {Comida} 200
 * @model {ErrorResponse} 404
 */
router.get('/:id', getMeal); 

module.exports = router;