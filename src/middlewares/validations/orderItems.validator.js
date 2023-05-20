const {body, param} = require ('express-validator');

// Validate the request body for creating an order item
module.exports.validateCreateOne = [
  body ('product').notEmpty ().withMessage ('Product is required.'),
  body ('quantity')
    .isInt ({min: 1})
    .withMessage ('Quantity must be a positive integer.'),
  body ('price').isNumeric ().withMessage ('Price must be a number.'),
];

// Validate the request parameters for getting an order item by ID
module.exports.validateGetOne = [
  param ('id').notEmpty ().withMessage ('Order Item ID is required.'),
];

// Validate the request body for updating an order item by ID
module.exports.validateUpdateOne = [
  param ('id').notEmpty ().withMessage ('Order Item ID is required.'),
  body ('product').notEmpty ().withMessage ('Product is required.'),
  body ('quantity')
    .isInt ({min: 1})
    .withMessage ('Quantity must be a positive integer.'),
  body ('price').isNumeric ().withMessage ('Price must be a number.'),
];

// Validate the request parameters for deleting an order item by ID
module.exports.validateDeleteOne = [
  param ('id').notEmpty ().withMessage ('Order Item ID is required.'),
];
