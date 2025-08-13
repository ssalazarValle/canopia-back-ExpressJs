import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { authMiddleware } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import productRoutes from './routes/products.js';
import swaggerSpec from './swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());



// debug of routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);

app.use(authMiddleware);

app.use('/api/products', productRoutes);

app.use('/api/categories', categoriesRoutes); 



app.get('/', (req, res) => {
  const endpoints = {
    public: [
      'GET /',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api-docs'
    ],
    protected: [
      'GET /api/products',
      'POST /api/products',
      'GET /api/categories',
      'POST /api/categories'
    ]
  };
  res.json({
    message: 'requires authentication',
    endpoints
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('- GET /');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/register');
  console.log('- GET /api/products');
  console.log('- POST /api/products');
  console.log('- GET /api/categories');
  console.log('- POST /api/categories');
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);

});