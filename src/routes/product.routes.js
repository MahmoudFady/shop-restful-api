const productController = require("../controller/product.controller");
const fileUploads = require("../middlewares/img-upload.mw");
const router = require("express").Router();
router
  .route("/products")
  .get(productController.getAll)
  .post(
    fileUploads.fields([
      [
        { name: "thumbnails", maxCount: 10 },
        { name: "image", maxCount: 1 },
      ],
    ]),
    productController.addOne
  );

router.route("/products/search").get(productController.getBySearch);
router.route("/products/price").get(productController.getByPriceRange);
router.route("/products/stock/:state").get(productController.getByStockState);
router
  .route("/products/category/:category")
  .get(productController.getByCategory);
router
  .route("/products/:id")
  .get(productController.getById)
  .patch(productController.updateOne)
  .delete(productController.deleteOne);
module.exports = router;
