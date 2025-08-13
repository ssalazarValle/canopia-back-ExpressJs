import { validationResult } from 'express-validator';
import CategoryModel from '../models/categories.js';

const CategoryController = {
  /**
   * Create a new category
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async create(req, res) {
    const existCategory = await CategoryModel.findByName(req.body.name);
    if (existCategory) {
      return res.status(409).json({
        message: 'Category already exists'
      });
    } 

    try {
      // Field validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, description } = req.body;

      // Check if category already exists
      const existingCategory = await CategoryModel.findByName(name);
      if (existingCategory) {
        return res.status(409).json({ 
          success: false,
          message: 'Category already exists' 
        });
      }

      // Create the category
      const newCategoryId = await CategoryModel.create({
        name,
        description
      });

      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: { id: newCategoryId }
      });
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  /**
   * Get all active categories
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getAll(req, res) {
    try {
      const categories = await CategoryModel.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  /**
   * Get a category by ID
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      res.status(200).json({
        success: true,
        data: category
      });
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },
};
export default CategoryController;
