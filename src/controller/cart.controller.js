const Cart = require("../models/cart.model");
const errUtil = require("../utils/error.util");

// Create a new cart
module.exports.createOne = async (req, res) => {
  try {
    const { user, products, totalAmount, totalPrice } = req.body;
    const cart = new Cart({ user, products, totalAmount, totalPrice });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to create cart." });
  }
};

// Get all carts
module.exports.getAll = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch carts." });
  }
};

// Get a cart by ID
module.exports.getOne = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");
    if (!cart) throw errUtil("Cart not found.", 404);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the cart." });
  }
};

// Update a cart by ID
module.exports.updateOne = async (req, res) => {
  try {
    const { user, products, totalAmount, totalPrice } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { user, products, totalAmount, totalPrice },
      { new: true }
    )
      .populate("user", "name email")
      .populate("products.product", "name price");
    if (!cart) throw errUtil("Cart not found.", 404);

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Delete a cart by ID
module.exports.deleteOne = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) throw errUtil("Cart not found.", 404);

    res.status(204).json({ message: "Cart deleted successfully" });
  } catch (error) {
    next(error);
  }
};
