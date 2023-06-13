const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const discountSchema = new Schema(
  {
    percentage: {
      type: Number,
      default: 0,
      min: 1,
      max: 100,
      default: Math.floor(Math.random() * 76) + 5,
    },
    expireDate: {
      type: Date,
      default: Date.now() + 1000 * 60 * 60 * 10,
    },
  },
  { _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: { type: Number, required: true, min: 0 },
    discount: {
      type: discountSchema,
      default: {
        percentage: Math.floor(Math.random() * 76) + 5,
        expireDate: Date.now() + 1000 * 60 * 60 * 10,
      },
    },
    thumbnail: String,
    images: [String],
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
      required: false,
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timeseries: true } // error
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
  if (!reviews) return 0;
  const avgRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return avgRating.toFixed(2);
});
module.exports = mongoose.model("Product", productSchema);
