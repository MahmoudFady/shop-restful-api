const Cart = require("../models/cart.model");
const cartPopulateOptions = {
  path: "products.product",
  select: "-comments -images -details",
};
module.exports.getProductByIdFromCart = (userId, productId) => {
  return Cart.findOne({
    user: userId,
    "products.product": productId,
  }).populate(cartPopulateOptions);
};
module.exports.createOne = (userId, productId, productPrice) => {
  return new Cart({
    user: userId,
    products: [{ product: productId, quantity: 1 }],
    totalPrice: productPrice,
  }).save();
};
module.exports.getCartByUserId = (userId) => {
  return Cart.findOne({ user: userId }).populate(cartPopulateOptions);
};
module.exports.deleteCartByUserId = (userId) => {
  return Cart.findOneAndDelete({ user: userId });
};
module.exports.pushProduct = (userId, productId, price) => {
  return Cart.findOneAndUpdate(
    { user: userId },
    {
      $push: { products: { product: productId, quantity: 1 } },
      $inc: { totalPrice: price },
    },
    { new: true }
  ).populate(cartPopulateOptions);
};
module.exports.removeProduct = (userId, productId, price) => {
  return Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: { products: { product: productId } },
      $inc: { totalPrice: -price },
    },
    { new: true }
  ).populate(cartPopulateOptions);
};
module.exports.updateProductQuantity = (userId, productId, price, quan) => {
  return Cart.findOneAndUpdate(
    {
      user: userId,
      "products.product": productId,
    },
    {
      $inc: { totalPrice: price, "products.$.quantity": quan },
    },
    {
      new: true,
    }
  ).populate(cartPopulateOptions);
};
