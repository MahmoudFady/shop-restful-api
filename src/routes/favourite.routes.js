const router = require("express").Router();
const checkAuth = require("../middlewares/check-auth.mw");
const favsController = require("../controller/favourite.controller");
router.route("/favs/user").get(checkAuth, favsController.getUserFavs);
router
  .route("/favs/:productId")
  .all(checkAuth)
  .post(favsController.push)
  .delete(favsController.pop);

module.exports = router;
