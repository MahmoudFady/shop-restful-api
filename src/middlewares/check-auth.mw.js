const tokenUtil = require("../utils/token.util");
const errUtil = require("../utils/error.util");
module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const user = tokenUtil.verify(token);
    req["user"] = user;
    next();
  } catch (err) {
    next(errUtil(err.message, 204));
  }
};
module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") throw errUtil("action not allowed", 403);
  next();
};
