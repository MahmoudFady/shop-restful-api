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
  .route("/reviews")
  .get(checkAuth, checkAuth.isAdmin, reviewController.getAllReviews)
  .post(
    checkAuth,
    validationResult,
    addReviewValidator,
    reviewController.addReview
  );
router.route("/reviews/product/:id").get(reviewController.getProductReviews);
router
  .route("/reviews/:id")
  .patch(
    checkAuth,
    validationResult,
    updateReviewValidator,
    reviewController.updateReview
  )
  .delete(
    checkAuth,
    validationResult,
    deleteReviewValidator,
    reviewController.deleteReview
  );

module.exports = router;
