const OrderItem = require ('../models/orderItem.model');
const errUtil = require ('../utils/error.util');

// Create a new order item
module.exports.createOne = async (req, res) => {
  try {
    const {product, quantity, price} = req.body;
    const orderItem = new OrderItem ({product, quantity, price});
    await orderItem.save ();
    res.status (201).json (orderItem);
  } catch (error) {
    res.status (500).json ({message: 'Failed to create order item.'});
  }
};

// Get all order items
module.exports.getAll = async (req, res) => {
  try {
    const orderItems = await OrderItem.find ().populate (
      'product',
      'name price'
    );
    res.json (orderItems);
  } catch (error) {
    res.status (500).json ({message: 'Failed to fetch order items.'});
  }
};

// Get an order item by ID
module.exports.getOne = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById (req.params.id).populate (
      'product',
      'name price'
    );
    if (!orderItem) {
      throw errUtil ('Order item not found.', 404, false);
    }
    res.status (200).json (orderItem);
  } catch (error) {
    res.status (500).json ({message: 'Failed to fetch the order item.'});
  }
};

// Update an order item by ID
module.exports.updateOne = async (req, res) => {
  try {
    const {product, quantity, price} = req.body;
    const orderItem = await OrderItem.findByIdAndUpdate (
      req.params.id,
      {product, quantity, price},
      {new: true}
    ).populate ('product', 'name price');
    if (!orderItem) {
      throw errUtil ('Order item not found.', 404, false);
    }
    res.status (200).json (orderItem);
  } catch (error) {
    res.status (500).json ({message: 'Failed to update the order item.'});
  }
};

// Delete an order item by ID
module.exports.deleteOne = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete (req.params.id);
    if (!orderItem) {
      throw errUtil ('Order item not found.', 404, false);
    }
    res.status (204).json ({message: 'Order item deleted successfully'});
  } catch (error) {
    res.status (500).json ({error: 'Failed to delete the order item.'});
  }
};
