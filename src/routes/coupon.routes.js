const express = require("express");
const router = express.Router();
const validationResult = require("../middlewares/validations/validation-result");

const {
  addCouponValidator,
  getCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require("../middlewares/validations/coupon.validator");

const couponController = require("../controller/coupon.controller");

router
  .route("/coupon")
  .get(couponController.getCoupons)
  .post(addCouponValidator, validationResult, couponController.addCoupon);

router
  .route("/coupon/:id")
  .get(getCouponValidator, validationResult, couponController.getCoupon)
  .patch(updateCouponValidator, validationResult, couponController.updateCoupon)
  .delete(
    deleteCouponValidator,
    validationResult,
    couponController.deleteCoupon
  );

module.exports = router;
