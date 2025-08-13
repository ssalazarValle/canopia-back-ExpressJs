import { body, validationResult } from 'express-validator';

/**
 * Validates authentication inputs (login/register)
 */
export const validateAuthInput = (isRegister = false) => {
  const validations = [
    body('email')
      .trim()
      .isEmail().withMessage('Must be a valid email')
      .normalizeEmail()
      .isLength({ max: 100 }).withMessage('Email must not exceed 100 characters'),
    
    body('password')
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
      }).withMessage('Password must contain at least 8 characters, 1 uppercase letter and 1 number')
  ];

  if (isRegister) {
    validations.push(
      body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 4, max: 50 }).withMessage('Username must be between 4 and 50 characters')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Only letters, numbers and underscores are allowed'),
      
      body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Invalid role')
    );
  }

  return validations;
};

export const userValidation = [
  body('email')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),
  
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1
    }).withMessage('Password does not meet requirements'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateProductInput = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description too long'),
    
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
    .toFloat(),
    
  body('stock')
    .isInt({ min: 0 }).withMessage('Stock must be 0 or more')
    .toInt(),
    
  body('category_id')
    .optional()
    .isInt().withMessage('Category ID must be an integer')
    .toInt()
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};