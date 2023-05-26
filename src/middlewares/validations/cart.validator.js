const {param, body} = require ('express-validator');

module.exports.validateCreateOne = [
  body ('user').notEmpty ().withMessage ('User is required'),
  body ('products')
    .isArray ({min: 1})
    .withMessage ('At least one product is required'),
  body ('totalAmount').isInt ().withMessage ('Total amount must be an integer'),
  body ('totalPrice').isFloat ().withMessage ('Total price must be a number'),
];

module.exports.validateUpdateOne = [
  body ('user').optional ().notEmpty ().withMessage ('User is required'),
  body ('products')
    .optional ()
    .isArray ({min: 1})
    .withMessage ('At least one product is required'),
  body ('totalAmount')
    .optional ()
    .isInt ()
    .withMessage ('Total amount must be an integer'),
  body ('totalPrice')
    .optional ()
    .isFloat ()
    .withMessage ('Total price must be a number'),
];
module.exports.validateDeleteOne = [
  param ('id').isMongoId ().withMessage ('Invalid cart ID'),
];

module.exports.validateGetOne = [
  param ('id').isMongoId ().withMessage ('Invalid cart ID'),
];
