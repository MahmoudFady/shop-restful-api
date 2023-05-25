const path = require("path");
const express = require("express");
const productController = require(path.join(
  __dirname,
  "..",
  "controller",
  "product.controller"
));
const productFilesMw = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "img-upload.mw"
)).fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "thumbnails",
    maxCount: 5,
  },
]);
const productValidator = require("./../middlewares/validations/product.validator");
const validationResult = require("./../middlewares/validations/validation-result");
const router = express.Router();

router
  .route("/product")
  .post(
    // productValidator.addProductValidator,
    // validationResult,
    productFilesMw,
    productController.createOne
  )
  .put(
    productValidator.updateProductValidator,
    validationResult,
    productController.updateOne
  );

router.route("/product/:id").get(productController.getProductDetails);

router
  .route("/product/category/:category")
  .get(productController.getProductsInCategoryCount);

router
  .route("/product/category/:category/:page")
  .get(
    productValidator.paramCategoryValidator,
    validationResult,
    productController.getProductsInCategory
  );

router
  .route("/product/priceasc/category/:category/:page")
  .get(
    productValidator.paramCategoryValidator,
    validationResult,
    productController.getProductsInCategoryPriceAsc
  );

router
  .route("/product/pricedesc/category/:category/:page")
  .get(
    productValidator.paramCategoryValidator,
    validationResult,
    productController.getProductsInCategoryPriceDesc
  );

router
  .route("/product/subcategory/:subcategory")
  .get(productController.getProductsInSubCategoryCount);

router
  .route("/product/subcategory/:subcategory/:page")
  .get(
    productValidator.paramSubcategoryValidator,
    validationResult,
    productController.getProductsInSubCategory
  );

router
  .route("/product/priceasc/subcategory/:subcategory/:page")
  .get(
    productValidator.paramSubcategoryValidator,
    validationResult,
    productController.getProductsInSubCategoryPriceAsc
  );

router
  .route("/product/pricedesc/subcategory/:subcategory/:page")
  .get(
    productValidator.paramSubcategoryValidator,
    validationResult,
    productController.getProductsInSubCategoryPriceDesc
  );

router.route("/product/search/:text").get(productController.productsSearch);

router.route("/product/unactive").get(productController.getAllUnactiveProducts); //for admin to reactivate it

module.exports = router;
