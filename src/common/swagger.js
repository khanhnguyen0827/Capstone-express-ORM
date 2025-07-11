import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Tài liệu API cho dự án Express',
    },
    servers: [
      {
        url: 'http://localhost:3069',
      },
    ],
  },
  apis: ['./src/routers/*.js', './src/controllers/*.js'], // Đường dẫn tới các file có chú thích swagger
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setupSwagger };
