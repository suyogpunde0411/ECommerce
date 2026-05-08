const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, vendorOnly } = require('../middleware/authMiddleware');

// GET /api/products
// Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).populate('vendor', 'name email');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// POST /api/products
// Insert products (Vendors only)
router.post('/', protect, vendorOnly, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ 
      name, 
      price, 
      description,
      vendor: req.user.id
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error creating product' });
  }
});

module.exports = router;
