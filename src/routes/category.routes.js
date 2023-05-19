const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controller/category.controller");
const validator = require("../middlewares/validations/category.validator");
const checkValidation = require("../middlewares/validations/validation-result");
router
  .route("/categories")
  .get(categoryCtrl.getAll)
  .post(validator.createOne, checkValidation, categoryCtrl.createOne);
router
  .route("/categories/:id/sub", validator.isMongoId)
  .post(checkValidation, categoryCtrl.addSubCategory)
  .patch(checkValidation, categoryCtrl.editSubCategory)
  .delete(checkValidation, categoryCtrl.pullSubCategory);
module.exports = router;
