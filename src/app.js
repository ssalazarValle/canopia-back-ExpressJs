import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// debug of routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  const endpoints = {
    public: [
      'GET /',
      'POST /api/auth/register',
      'POST /api/auth/login'
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
  console.log('- POST /api/auth/register');
});