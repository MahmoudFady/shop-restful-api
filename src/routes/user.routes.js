const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
router.route("/users").get(userCtrl.signin).post(userCtrl.signin);
router
  .route("/users/:id")
  .get(userCtrl.getOne)
  .patch(userCtrl.updateOne)
  .delete(userCtrl.deleteOne);
module.exports = router;
