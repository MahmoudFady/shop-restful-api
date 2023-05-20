const express = require ('express');
const router = express.Router ();
const orderController = require ('../controller/order.controller');
const validationResult = require ('../middlewares/validations/validation-result');
const validator = require ('../middlewares/validations/order.validator');

router.post ('/orders', orderController.createOne);
router.get ('/orders', orderController.getOne);
router.get ('/orders/:id', orderController.getOne);
router.patch ('/orders/:id', orderController.updateOne);
router.delete ('/orders/:id', orderController.deleteOne);

//with Validation
// router.post ('/orders', validator.validateCreateOne,validationResult,orderController.createOne);
// router.get ('/orders',  orderController.getAll);
// router.get ('/orders/:id',  validator.validateGetOne,validationResult,orderController.getOne);
// router.patch ('/orders/:id',    validator.validateUpdateOne,validationResult,orderController.updateOne);
// router.delete ('/orders/:id',   validator.validateDeleteOne,validationResult,orderController.deleteOne);
module.exports = router;
