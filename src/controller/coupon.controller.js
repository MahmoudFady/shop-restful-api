const couponModel = require("../models/coupon.model");
const errUtil = require("../utils/error.util");
exports.addCoupon = async (req, res, next) => {
  try {
    const coupon = await new create(req.body).save();
    res.status(200).json({
      message: "cupon created ",
      coupon,
    });
  } catch (err) {
    next(err);
  }
};
exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await couponModel.find();
    res.status(200).json({
      message: "get all cupons",
      coupons,
    });
  } catch (err) {
    next(err);
  }
};
exports.getCoupon = async (req, res, next) => {
  try {
    const coupon = await couponModel.findById(req.params.id);
    if (!coupon) throw errUtil("cupon does not exist", 404);
    res.status(200).json({
      message: "get coupon by it id",
      coupon,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateCoupon = async (req, res, next) => {
  try {
    const coupon = couponModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "coupon updated",
      coupon,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = couponModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "coupon deleted",
      id: coupon._id,
    });
  } catch (err) {
    next(err);
  }
};
