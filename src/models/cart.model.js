const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.ObjectId, ref: "Product" },
    quantity: Number,
  },
  { _id: false }
);
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [productSchema],
  totalPrice: Number,
});
cartSchema.pre("findOneAndUpdate", async function (next) {
  const cart = this;

  // Check if the products array exists
  if (cart.products && Array.isArray(cart.products)) {
    // Remove product items with zero quantity
    cart.products = cart.products.filter((product) => product.quantity !== 0);

    // Check if the products array is empty
    if (cart.products.length === 0) {
      const CartModel = mongoose.model("Cart");
      await CartModel.findByIdAndDelete(cart._id); // Delete the cart
    } else {
      // Calculate the total price again
      cart.totalPrice = cart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      await cart.save(); // Save the updated cart
    }
  }

  next();
});

module.exports = mongoose.model("Cart", cartSchema);
