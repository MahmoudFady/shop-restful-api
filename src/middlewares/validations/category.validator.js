const { param, body } = require("express-validator");
const isMongoId = param("id").isMongoId().withMessage("invalid id");
module.exports.deleteOne = [isMongoId];
module.exports.getOne = [isMongoId];
module.exports.createOne = [
  body("name")
    .notEmpty()
    .withMessage("name cant be empty")
    .isAlpha()
    .withMessage("name must be string"),
  body("description")
    .notEmpty()
    .withMessage("description cant be empty")
    .isString()
    .withMessage("description must be string"),
];

module.exports.updateOne = [
  isMongoId,
  body("name")
    .optional()
    .notEmpty()
    .withMessage("name cant be empty")
    .isAlpha()
    .withMessage("name must be string"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description cant be empty")
    .isString()
    .withMessage("description must be string"),
];
module.exports.isMongoId = [isMongoId];
