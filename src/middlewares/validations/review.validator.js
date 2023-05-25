const { param, body } = require("express-validator");

module.exports.addReviewValidator = [
  body("user").isMongoId().withMessage("user id should be mongo id"),
  body("product").isMongoId().withMessage("product id should be mongo id"),
  body("rating").isNumeric().withMessage("should be number between 1 to 5"),
  body("comment")
    .optional()
    .notEmpty()
    .withMessage("please enter your comment"),
];
module.exports.getReviewValidator = [
  param("id").isMongoId().withMessage("review id should be mongo id"),
];
module.exports.updateReviewValidator = [
  body("user").optional().isMongoId().withMessage("user id should be mongo id"),
  body("product")
    .optional()
    .isMongoId()
    .withMessage("product id should be mongo id"),
  body("rating")
    .optional()
    .isNumeric()
    .withMessage("should be number between 1 to 5"),
  body("comment")
    .optional()
    .notEmpty()
    .withMessage("please enter your comment"),
];

module.exports.deleteReviewValidator = [
  param("id").isMongoId().withMessage("review id should be mongo id"),
];
