const errUtil = require("../utils/error.util");
module.exports = (req, res, next) => {
  next(errUtil("page not found", 404));
};
