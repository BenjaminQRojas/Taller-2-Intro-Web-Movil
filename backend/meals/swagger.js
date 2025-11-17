const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./themealdbapiRoutes.js'];

// Objeto que define el esquema de un modelo de comida basado en meal.model.js
const mealSchema = {
    idMeal: { type: 'string', required: true, example: "52855" },
    strMeal: { type: 'string', required: true, example: "Apam balik" },
    strCategory: { type: 'string', example: "Dessert" },
    strArea: { type: 'string', example: "Malaysian" },
    strMealThumb: { type: 'string', example: "https://www.themealdb.com/images/media/meals/adpsoz1458022802.jpg" },
    strInstructions: { type: 'string', example: "Mix milk, oil and egg together..." },
    strIngredient1: { type: 'string', example: "Milk" },
    strMeasure1: { type: 'string', example: "200ml" },
    // ... (El resto de los 20 ingredientes y medidas se incluirían aquí)
    strIngredient20: { type: 'string', example: null },
    strMeasure20: { type: 'string', example: null },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
};

const doc = {
    info: {
        version: "1.0.0",
        title: "TheMealDB API Local",
        description: "Documentación para la API de comidas, un proyecto basado en TheMealDB."
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Comidas",
            description: "Rutas para buscar, obtener detalles y obtener comidas aleatorias."
        }
    ],
    definitions: { 
        // Modelo de una comida individual
        Comida: mealSchema,
        // Modelo para una lista de comidas (para la ruta /)
        ListaComidas: {
            // Nota: En Swagger 2.0, los arreglos usan 'type: array' y 'items'
            type: 'object',
            properties: {
                meals: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Comida' // Referencia el modelo Comida
                    }
                }
            }
        },
        // Modelo para manejar errores comunes (ej. 404)
        ErrorResponse: {
            code: { type: 'number', example: 404 },
            message: { type: 'string', example: "Recurso no encontrado o ID inválido." }
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc);