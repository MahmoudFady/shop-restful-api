const resetPasswordModel = require("../models/reset-password.model");
const userModel = require("../models/user.model");
const errUtil = require("../utils/error.util");
const crypto = require("crypto");
module.exports.getResetLink = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userModel.findOne({ email }).select("_id");
    if (!user) throw errUtil("email doesn't exist", 404);
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetLink =
      req.protocol + "://" + req.get("host") + "/reset-passowrd" + resetToken;
    new resetPasswordModel({
      userId: user._id,
      email,
      resetToken,
    }).save();
    res.status(200).json({
      message: "get reset password link",
      resetLink,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.resetPassword = async (req, res, next) => {
  try {
    const resetToken = req.params["resetToken"];
    const { email, password } = req.body;
    const userResetToken = await resetPasswordModel.findOne({
      email,
      resetToken,
    });
    if (!userResetToken) throw errUtil("something go wrong");
    userModel
      .findByIdAndUpdate(userResetToken.userId, {
        password,
      })
      .then((user) => {
        return resetPasswordModel.deleteOne({ userId: user._id });
      })
      .then(() => {
        res.status(200).json({
          message: "password has been reset",
          userId: userResetToken.userId,
        });
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
