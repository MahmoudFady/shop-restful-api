const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        totalAmount: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: Number,
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
