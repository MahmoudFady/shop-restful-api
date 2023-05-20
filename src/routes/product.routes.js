const path = require("path");
const express = require("express");
const multerMW = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "img-upload.mw"
));
const productController = require(path.join(
  __dirname,
  "..",
  "controller",
  "product.controller"
));
const productFilesMw = multerMW.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "thumbnails",
    maxCount: 5,
  },
]);
const router = express.Router();

router
  .route("/product")
  .post(productFilesMw, productController.createOne)
  .put(productController.updateOne);

router.route("/product/:id").get(productController.getProductDetails);

router
  .route("/product/category/:category")
  .get(productController.getProductsInCategoryCount);

router
  .route("/product/category/:category/:page")
  .get(productController.getProductsInCategory);

router
  .route("/product/priceasc/category/:category/:page")
  .get(productController.getProductsInCategoryPriceAsc);

router
  .route("/product/pricedesc/category/:category/:page")
  .get(productController.getProductsInCategoryPriceDesc);

router
  .route("/product/subcategory/:subcategory")
  .get(productController.getProductsInSubCategoryCount);

router
  .route("/product/subcategory/:subcategory/:page")
  .get(productController.getProductsInSubCategory);

router
  .route("/product/priceasc/subcategory/:subcategory/:page")
  .get(productController.getProductsInSubCategoryPriceAsc);

router
  .route("/product/pricedesc/subcategory/:subcategory/:page")
  .get(productController.getProductsInSubCategoryPriceDesc);

router.route("/product/unactive").get(productController.getAllUnactiveProducts); //for admin to reactivate it

module.exports = router;
