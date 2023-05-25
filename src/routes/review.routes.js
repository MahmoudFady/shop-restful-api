const express = require("express");
const router = express.Router();

const {
  addReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../middlewares/validations/review.validator");
const reviewController = require("../controller/review.controller");
const validationResult = require("../middlewares/validations/validation-result");

router
  .route("/")
  .get(reviewController.getReviews)
  .post(validationResult, addReviewValidator, reviewController.addReview);

router
  .route("/:id")
  .get(validationResult, getReviewValidator, reviewController.getReview)
  .patch(validationResult, updateReviewValidator, reviewController.updateReview)
  .delete(
    validationResult,
    deleteReviewValidator,
    reviewController.deleteReview
  );

module.exports = router;
