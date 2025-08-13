import { Router } from 'express';
import { body, param } from 'express-validator';
import CategoryController from '../controllers/categories.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Validaciones comunes
const nameValidation = body('name')
  .trim()
  .notEmpty().withMessage('El nombre es requerido')
  .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres');

const descriptionValidation = body('description')
  .optional()
  .trim()
  .isLength({ max: 255 }).withMessage('La descripción no puede exceder los 255 caracteres');

const idValidation = param('id')
  .isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electrónicos"
 *               description:
 *                 type: string
 *                 example: "Productos electrónicos y dispositivos"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Validación fallida
 *       409:
 *         description: La categoría ya existe
 *       500:
 *         description: Error del servidor
 */
router.post(
  '/',
  [
    nameValidation,
    descriptionValidation
  ],
  authMiddleware,
  CategoryController.create
);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías activas
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       500:
 *         description: Error del servidor
 */
router.get('/', authMiddleware, CategoryController.getAll);


export default router;