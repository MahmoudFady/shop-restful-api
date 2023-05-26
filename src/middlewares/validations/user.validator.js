const {body, param} = require ('express-validator');

// Validate the request body for user sign-in
exports.validateSignIn = [
  body ('email').notEmpty ().withMessage ('Email is required.'),
  body ('password').notEmpty ().withMessage ('Password is required.'),
];

// Validate the request body for user sign-up
exports.validateSignUp = [
  body ('email').notEmpty ().withMessage ('Email is required.'),
  body ('phone').notEmpty ().withMessage ('Phone is required.'),
];

// Validate the request parameters for getting a user by ID
exports.validateGetOne = [
  param ('id').notEmpty ().withMessage ('User ID is required.'),
];

// Validate the request parameters for deleting a user by ID
exports.validateDeleteOne = [
  param ('id').notEmpty ().withMessage ('User ID is required.'),
];

// Validate the request parameters and body for updating a user by ID
exports.validateUpdateOne = [
  param ('id').notEmpty ().withMessage ('User ID is required.'),
  body ().notEmpty ().withMessage ('Request body is required.'),
];
