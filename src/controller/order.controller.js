const Order = require ('../models/order.model');
const errUtil = require ('../utils/error.util');
// Create a new order
module.exports.createOne = async (req, res) => {
  try {
    const {
      user,
      products,
      status,
      shippingAddress,
      paymentMethod,
      paymentResult,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = new Order ({
      user,
      products,
      status,
      shippingAddress,
      paymentMethod,
      paymentResult,
      shippingPrice,
      totalPrice,
    });
    await order.save ();
    res.status (201).json (order);
  } catch (error) {
    res.status (500).json ({message: 'Failed to create order.'});
  }
};

// Get all orders
module.exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find ()
      .populate ('user', 'name email')
      .populate ('products.product', 'name price');
    res.status (200).json (orders);
  } catch (error) {
    res.status (500).json ({message: 'Failed to fetch orders.'});
  }
};

// Get an order by ID
module.exports.getOne = async (req, res) => {
  try {
    const order = await Order.findById (req.params.id)
      .populate ('user', 'name email')
      .populate ('products.product', 'name price');
    if (!order) {
      throw errUtil ('Order not found.', 404, false);
    }
    res.status (200).json (order);
  } catch (error) {
    res.status (500).json ({message: 'Failed to fetch the order.'});
  }
};

// Update an order by ID
module.exports.updateOne = async (req, res) => {
  try {
    const {
      user,
      products,
      status,
      shippingAddress,
      paymentMethod,
      paymentResult,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.findByIdAndUpdate (
      req.params.id,
      {
        user,
        products,
        status,
        shippingAddress,
        paymentMethod,
        paymentResult,
        shippingPrice,
        totalPrice,
        updatedAt: Date.now (),
      },
      {new: true}
    )
      .populate ('user', 'name email')
      .populate ('products.product', 'name price');
    if (!order) {
      throw errUtil ('Order not found.', 404, false);
    }
    res.status (200).json (order);
  } catch (error) {
    res.status (500).json ({message: 'Failed to update the order.'});
  }
};

// Delete an order by ID
module.exports.deleteOne = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete (req.params.id);
    if (!order) {
      throw errUtil ('Order not found.', 404, false);
    }
    res.status (204).json ({message: 'order deleted successfully'});
  } catch (error) {
    res.status (500).json ({message: 'Failed to delete the order.'});
  }
};
