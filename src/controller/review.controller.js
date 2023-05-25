const Review = require("../models/review.model");

exports.addReview = async (request, response, next) => {
  try {
    const review = Review.create(request.body);
    response.status(200).json({
      data: {
        review,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getReviews = async (request, response, next) => {
  try {
    const reviews = Review.find({});
    response.status(200).json({
      data: {
        reviews,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getReview = async (request, response, next) => {
  try {
    const review = Review.findById(request.params.id);
    if (!review) {
      throw new Error("invalid id for review");
    }
    response.status(200).json({
      data: {
        review,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateReview = async (request, response, next) => {
  try {
    const review = Review.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!review) {
      throw new Error("invalid id for review");
    }
    response.status(200).json({
      data: {
        review,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (request, response, next) => {
  try {
    const review = Review.findByIdAndDelete(request.params.id);
    if (!review) {
      throw new Error("invalid id for review");
    }
    response.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    next(err);
  }
};
