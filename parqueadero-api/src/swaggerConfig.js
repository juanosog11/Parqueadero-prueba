// swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Vehículos',
            version: '1.0.0',
            description: 'API para gestionar vehículos en un sistema de estacionamiento',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/*.js'], // Asegúrate de que apunte a todas las rutas
};

const specs = swaggerJsdoc(options);
export { swaggerUi, specs };
