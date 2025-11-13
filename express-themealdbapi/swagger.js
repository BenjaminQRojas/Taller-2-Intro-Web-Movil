const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./themealdbapiRoutes.js'];

const doc = {
    info: {
        version: "1.0.0",
        title: "API base de datos de comidas",
        description: "Documentación de la API construida con Express."
    },
    host: "localhost:4000",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Comidas",
            description: "Rutas relacionadas con las comidas"
        }
    ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);