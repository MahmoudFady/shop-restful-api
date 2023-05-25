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
  .post(addReviewValidator,validationResult, reviewController.addReview);

router
  .route("/:id")
  .get(getReviewValidator,validationResult,  reviewController.getReview)
  .patch( updateReviewValidator, validationResult,reviewController.updateReview)
  .delete(
    
    deleteReviewValidator,validationResult,
    reviewController.deleteReview
  );

module.exports = router;
