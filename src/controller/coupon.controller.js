const Coupon = require("../models/coupon.model");

exports.addCoupon = async (request, response, next) => {
  try {
    const coupon = Coupon.create(request.body);
    response.status(200).json({
      data: {
        coupon,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getCoupons = async (request, response, next) => {
  try {
    const coupons = Coupon.find({});
    response.status(200).json({
      data: {
        coupons,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getCoupon = async (request, response, next) => {
  try {
    const coupon = Coupon.findById(request.params.id);
    if (!coupon) {
      throw new Error("invalid id for review");
    }
    response.status(200).json({
      data: {
        coupon,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateCoupon = async (request, response, next) => {
  try {
    const coupon = Coupon.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!review) {
      throw new Error("invalid id for review");
    }
    response.status(200).json({
      data: {
        coupon,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCoupon = async (request, response, next) => {
  try {
    const coupon = Coupon.findByIdAndDelete(request.params.id);
    if (!coupon) {
      throw new Error("invalid id for review");
    }
    response.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    next(err);
  }
};
