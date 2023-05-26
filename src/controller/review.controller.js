const reviewModel = require("../models/review.model");
const productModel = require("../models/product.model");
const errUtil = require("../utils/error.util");
exports.addReview = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const review = await new reviewModel(req.body).save();
    await productModel.findOneAndUpdate(productId, {
      $addToSet: { reviews: review._id },
    });
    res.status(200).json({
      message: "review added",
      review,
    });
  } catch (err) {
    next(err);
  }
};
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json({
      message: "get all reviews",
      reviews,
    });
  } catch (err) {
    next(err);
  }
};
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await reviewModel.find({
      product: req.params.id,
    });
    if (!reviews.length) errUtil("product does not has reviews yet", 404);
    res.status(200).json({
      message: "get product reviews",
      reviews,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateReview = async (req, res, next) => {
  try {
    const review = await reviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!review) throw errUtil("review does not exist", 404);
    res.status(200).json({
      message: "review updated",
      review,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await reviewModel.findByIdAndDelete(reviewId);
    if (!review) throw errUtil("review does not exist", 404);
    res.status(200).json({
      message: "review deleted",
      reviewId,
    });
  } catch (err) {
    next(err);
  }
};
