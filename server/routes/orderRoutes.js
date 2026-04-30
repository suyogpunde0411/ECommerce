const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders
// Place a new order
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      items,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error placing order' });
  }
});

// GET /api/orders
// Get all orders (for simple verification)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

module.exports = router;
