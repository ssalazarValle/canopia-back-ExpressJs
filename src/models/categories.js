import pool from '../config/db.js';

const CategoryModel = {
  /**
   * Crear nueva categoría
   * @param {Object} categoryData - Datos de la categoría
   * @param {string} categoryData.name - Nombre de la categoría
   * @param {string} [categoryData.description] - Descripción de la categoría
   * @returns {Promise<number>} ID de la categoría creada
   */
  async create(categoryData) {
    const [result] = await pool.query(
      `INSERT INTO categories 
       (name, description) 
       VALUES (?, ?)`,
      [
        categoryData.name,
        categoryData.description || null
      ]
    );
    
    return result.insertId;
  },

  /**
   * Obtener todas las categorías activas
   * @returns {Promise<Array>} Lista de categorías
   */
  async findAll() {
    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE status = 1'
    );
    return rows;
  },

  /**
   * Obtener categoría por nombre
   * @param {string} name - Nombre de la categoría
   * @returns {Promise<Object|null>} Categoría encontrada o null
   */
  async findByName(name) {
    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE name = ? AND status = 1',
      [name]
    );
    return rows[0] || null;
  },


  /**
   * Obtener categoría por ID
   * @param {number} id - ID de la categoría
   * @returns {Promise<Object|null>} Categoría encontrada o null
   */
  async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND status = 1',
      [id]
    );
    return rows[0] || null;
  },
};

export default CategoryModel;