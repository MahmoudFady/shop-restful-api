const tokenUtil = require("../utils/token.util");
const errUtil = require("../utils/error.util");
const userModel = require("../models/user.model");
try {
  const token = req.headers["authorization"].split(" ")[1];
  const user = tokenUtil.verify(token);
  req["user"] = user;
  next();
} catch (err) {
  next(errUtil(err.message, 204, false));
}

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user.role !== 1) throw errUtil("not allowed action", 202, false);
    next();
  } catch (error) {
    next(err);
  }
};
