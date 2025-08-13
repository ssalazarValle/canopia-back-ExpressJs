import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Canopia API",
      version: "1.0.0",
      description: "API documentation for Canopia backend",
    },
    servers: [
      { url: "http://localhost:3000" }
    ],
  },
  apis: ["./src/routes/*.js"], // comentarios @swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
