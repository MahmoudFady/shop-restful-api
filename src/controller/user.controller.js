const userModel = require("../models/user.model");
const passwordUtil = require("../utils/password.util");
const tokenUtil = require("../utils/token.util");
const errUtil = require("../utils/error.util");
module.exports.getAll = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "get all users",
      users,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.signin = async (req, res, next) => {
  const { email, password } = req.params;
  try {
    const user = await userModel.findOne({ email });
    const errMsg = "";
    if (!user) errMsg = "email doesn't exist";
    if (!passwordUtil.compare(password, user.password))
      errMsg = "wrong password";
    if (errMsg) throw errUtil(errMsg, 404);
    const token = tokenUtil.create({ id: user._id, role: user.role });
    res.status(200).json({
      message: "signin success",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.signup = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const users = await userModel.find({ $or: [{ phone }, { email }] });
    if (users.length === 0) throw errUtil("user already exist ", 409);
    const user = await userModel(req.body).save();
    const token = tokenUtil({ id: user._id });
    res.status(200).json({
      message: "signup success",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getOne = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const user = await userModel.findById(id);
    if (!user) throw errUtil("user does not exist", 404);
    res.status(200).json({ message: "get user by id", user });
  } catch (err) {
    next(err);
  }
};
module.exports.getByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    const users = await userModel.find({ role });
    res.status(200).json({
      message: "user users by role : " + role,
      users,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const user = await userModel.findByIdAndDelete(id);
    if (!user) throw errUtil("user does not exist", 404);
    res.status(200).json({ message: "user deleted", id });
  } catch (err) {
    next(err);
  }
};
module.exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params["id"];
    const data = req.body;
    const user = await userModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw errUtil("user does not exist", 404);
    res.status(200).json({ message: "user updated", id });
  } catch (err) {
    next(err);
  }
};
