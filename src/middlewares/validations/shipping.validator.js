const {body, param} = require ('express-validator');

// Validate the request body for creating a shipping
module.exports.validateCreateOne = [
  body ('shippingId').notEmpty ().withMessage ('Shipping ID is required.'),
  body ('address').notEmpty ().withMessage ('Address is required.'),
  body ('trackingNumber')
    .notEmpty ()
    .withMessage ('Tracking Number is required.'),
];

// Validate the request parameters for getting a shipping by ID
module.exports.validateGetOne = [
  param ('id').notEmpty ().withMessage ('Shipping ID is required.'),
];

// Validate the request body for updating a shipping by ID
module.exports.validateUpdateOne = [
  param ('id').notEmpty ().withMessage ('Shipping ID is required.'),
  body ('shippingId').notEmpty ().withMessage ('Shipping ID is required.'),
  body ('address').notEmpty ().withMessage ('Address is required.'),
  body ('trackingNumber')
    .notEmpty ()
    .withMessage ('Tracking Number is required.'),
];

// Validate the request parameters for deleting a shipping by ID
module.exports.validateDeleteOne = [
  param ('id').notEmpty ().withMessage ('Shipping ID is required.'),
];
