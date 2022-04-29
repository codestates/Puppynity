const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Puppynity API Documnet',
      description: 'Final Project The `Puppynity`',
    },
    servers: [
      {
        url: 'http://localhost:8080', // 요청 URL
      },
    ],
  },
  apis: ['../src/routes/index.js'], // Swagger 파일 연동
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
