const express = require("express");
const router = express.Router();
const productCtrl = require("../controller/product.controller");
const multerMw = require("../middlewares/img-upload.mw");
const productFilesMw = multerMw.fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "thumbnails",
    maxCount: 5,
  },
]);
router.route("/product").post(productFilesMw, productCtrl.createOne);

module.exports = router;
