import CategoryModel from '../models/categories.js';
import ProductModel from '../models/products.js';

export default {
  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAll();
      const castProducts = products.map(product => ({
        ...product,
        status: product.status === 1 ? 'Active' : 'Inactive',
      }));

      res.json(castProducts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

async createProduct(req, res) {
    const categoryExists = await CategoryModel.findByName(req.body.category_name);
    if (!categoryExists) {
        return res.status(404).json({ error: 'Invalid category' });
    }

    try {
        const productData = {
            ...req.body,
            category_id: categoryExists.id 
        };
        
        const productId = await ProductModel.create(productData);
  
        const newProduct = await ProductModel.getById(productId);
        
        if (!newProduct) {
            return res.status(500).json({ 
                error: 'Product was created but could not be retrieved',
                productId: productId 
            });
        }
        return res.status(201).json(newProduct);

    } catch (error) {
        return res.status(500).json({ 
            error: error.sqlMessage || 'Failed to create product',
            details: error.message 
        });
    }
}
};

