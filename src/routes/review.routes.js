const express = require("express");
const router = express.Router();

const {
  addReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../middlewares/validations/review.validator");
const checkAuth = require("../middlewares/check-auth.mw");
const reviewController = require("../controller/review.controller");
const validationResult = require("../middlewares/validations/validation-result");

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    checkAuth,
    validationResult,
    addReviewValidator,
    reviewController.addReview
  );
router.route("/product/:id").get(reviewController.getProductReviews);
router
  .route("/:id")
  .patch(validationResult, updateReviewValidator, reviewController.updateReview)
  .delete(
    validationResult,
    deleteReviewValidator,
    reviewController.deleteReview
  );

module.exports = router;
