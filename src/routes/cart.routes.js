const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth.mw");
const cartController = require("../controller/cart.controller");
router
  .route("/cart")
  .all(checkAuth)
  .get(cartController.getCartByUserId)
  .delete(cartController.deleteCartByUserId);
router.post("/cart/new/:productId", checkAuth, cartController.createOne);
router
  .route("/cart/:productId")
  .all(checkAuth)
  .post(cartController.pushProduct)
  .delete(cartController.removeProduct)
  .patch(cartController.updateProductQuan);
module.exports = router;
