import pool from '../config/db.js';

const ProductModel = {
  /**
   * Obtener todos los productos activos
   * @returns {Promise<Array>} Lista de productos
   */
  async getAll() {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE status = 1'
    );
    return rows;
  },

  /**
   * Crear nuevo producto
   * @param {Object} productData - Datos del producto
   * @param {string} productData.name - Nombre del producto
   * @param {string} [productData.description] - Descripción
   * @param {number} productData.price - Precio
   * @param {number} productData.stock - Stock
   * @param {number} [productData.category_id] - ID de categoría
   * @returns {Promise<number>} ID del producto creado
   */
  async create(productData) {
    const [result] = await pool.query(
      `INSERT INTO products 
       (name, description, price, stock, category_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        productData.name,
        productData.description,
        productData.price,
        productData.stock,
        productData.category_id
      ]
    );
    return result.insertId;
  },
};

export default ProductModel;