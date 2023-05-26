const {body, param} = require ('express-validator');

// Validate the request body for creating an order
module.exports.validateCreateOne = [
  body ('user').notEmpty ().withMessage ('User is required.'),
  body ('products').isArray ().withMessage ('Products must be an array.'),
  // Add more validation rules for other fields if necessary
];

// Validate the request parameters for getting an order by ID
module.exports.validateGetOne = [
  param ('id').notEmpty ().withMessage ('Order ID is required.'),
];

// Validate the request body for updating an order by ID
module.exports.validateUpdateOne = [
  param ('id').notEmpty ().withMessage ('Order ID is required.'),
  body ('user').notEmpty ().withMessage ('User is required.'),
  body ('products').isArray ().withMessage ('Products must be an array.'),
  // Add more validation rules for other fields if necessary
];

// Validate the request parameters for deleting an order by ID
module.exports.validateDeleteOne = [
  param ('id').notEmpty ().withMessage ('Order ID is required.'),
];
