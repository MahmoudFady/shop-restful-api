const {validationResult} = require ('express-validator');
const errUtil = require ('../../utils/error.util');
module.exports = (request, response, next) => {
  let errors = validationResult (request).errors;
  if (errors.length != 0) {
    let errMsgs = errors.reduce (
      (current, err) => current + err.msg + ' , ',
      ' '
    );
    next (errUtil (errMsgs, 442));
  } else next ();
};
