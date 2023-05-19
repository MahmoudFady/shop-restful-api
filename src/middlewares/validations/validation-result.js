const { validationResult } = require("express-validator");
const errUtil = require("../../../core/utils/error.util");
module.exports = (request, response, next) => {
  let errors = validationResult(request).errors;
  if (errors.length != 0) {
    let errMsgs = errors.reduce(
      (current, err) => current + err.msg + " , ",
      " "
    );
    const err = errUtil.getResErr(errMsgs, 442);
    next(err);
  } else next();
};
