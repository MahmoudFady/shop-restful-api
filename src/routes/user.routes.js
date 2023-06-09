const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
router.route("/users").get(userCtrl.getAll).post(userCtrl.signup);
router.route("/users/signin").post(userCtrl.signin);
router.route("/users/role/:role").get(userCtrl.getByRole);
router
  .route("/users/:id")
  .get(userCtrl.getOne)
  .patch(userCtrl.updateOne)
  .delete(userCtrl.deleteOne);
module.exports = router;
