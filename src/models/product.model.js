const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const discountSchema = new Schema(
  {
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    expireDate: Date,
  },
  { _id: false }
);
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    stockCount: { type: Number, required: true, min: 0 },
    discount: discountSchema,
    thumbnails: [String],
    image: String,
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
      default: null,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: String },
    details: Object,
    sku: String,
    active: { type: Boolean, default: true },
  },
  { timeseries: true, toJSON: { virtual: true } } // error
);
productSchema.virtual("priceAfterDiscount").get(function () {
  let { price, discount } = this;
  price = price - price * (discount.percentage / 100);
  return price.toFixed(2);
});
discountSchema.virtual("isValid").get(function () {
  const { percentage, expireDate } = this;
  const isValid = percentage > 0 && expireDate > new Date();
  return isValid;
});
productSchema.virtual("avgRating").get(function () {
  const reviews = this.reviews;
  if (reviews.length === 0) {
    return 0;
  }
  const avgRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return avgRating.toFixed(2);
});
productSchema.index({ title: "text", description: "text" });
module.exports = mongoose.model("Product", productSchema);
