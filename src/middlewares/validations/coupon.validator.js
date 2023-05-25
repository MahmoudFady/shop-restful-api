const { param, body } = require("express-validator");

module.exports.addCouponValidator = [
  body("code").notEmpty().withMessage("please enter your code"),
  body("percentage").isNumeric().withMessage("percentage should be number"),
  body("users")
    .isArray()
    .withMessage("should be array")
    .isMongoId()
    .withMessage("should be mongo id"),
  body("avaliableCount").isNumeric().withMessage("should be number"),
];
module.exports.getCouponValidator = [
  param("id").isMongoId().withMessage("review id should be mongo id"),
];
module.exports.updateCouponValidator = [
  body("code").optional().notEmpty().withMessage("please enter your code"),
  body("percentage")
    .optional()
    .isNumeric()
    .withMessage("percentage should be number"),
  body("users")
    .optional()
    .isArray()
    .withMessage("should be array")
    .isMongoId()
    .withMessage("should be mongo id"),
  body("avaliableCount").optional().isNumeric().withMessage("should be number"),
];

module.exports.deleteCouponValidator = [
  param("id").isMongoId().withMessage("review id should be mongo id"),
];
