const express = require ('express');
const router = express.Router ();
const cartController = require ('../controller/cart.controller');
const validationResult = require ('../middlewares/validations/validation-result');
const validator = require ('../middlewares/validations/cart.validator');

router.post ('/carts', cartController.createOne);
router.get ('/carts', cartController.getAll);
router.get ('/carts/:id', cartController.getOne);
router.patch ('/carts/:id', cartController.updateOne);
router.delete ('/carts/:id', cartController.deleteOne);

// //with Validation
// router.post ('/carts', validator.validateCreateOne,validationResult,cartController.createOne);
// router.get ('/carts',  cartController.getAll);
// router.get ('/carts/:id',  validator.validateGetOne,validationResult,cartController.getOne);
// router.patch ('/carts/:id',    validator.validateUpdateOne,validationResult,cartController.updateOne);
// router.delete ('/carts/:id',   validator.validateDeleteOne,validationResult,cartController.deleteOne);

module.exports = router;
