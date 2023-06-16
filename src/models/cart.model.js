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
module.exports = mongoose.model("Cart", cartSchema);
