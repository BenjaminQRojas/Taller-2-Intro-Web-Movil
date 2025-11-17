import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Express para PokeAPI',
            version: '1.0.0',
            description: 'API Express para PokeAPI y PostgreSQL',
            servers: [
                {
                    url: 'http://localhost:4000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./*.js', './swagger/*.js']
};

const specs = swaggerJsdoc(options);
export default specs;