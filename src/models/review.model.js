const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: { type: Number, required: true, min: [1,"min rating value is 1"], max: [5,"max rating value is 5"] },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
