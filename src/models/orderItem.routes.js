const express = require ('express');
const router = express.Router ();
const orderItemController = require ('../controller/orderItem.controller');
const validationResult = require ('../middlewares/validations/validation-result');
const validator = require ('../middlewares/validations/orderItems.validator');
router.post ('/order-items', orderItemController.createOne);
router.get ('/order-items', orderItemController.getAll);
router.get ('/order-items/:id', orderItemController.getOne);
router.patch ('/order-items/:id', orderItemController.updateOne);
router.delete ('/order-items/:id', orderItemController.deleteOne);

// //with Validation
// router.post ('/order-items', validator.validateCreateOne,validationResult,orderItemController.createOne);
// router.get ('/order-items',  orderItemController.getAll);
// router.get ('/order-items/:id',  validator.validateGetOne,validationResult,orderItemController.getOne);
// router.patch ('/order-items/:id',    validator.validateUpdateOne,validationResult,orderItemController.updateOne);
// router.delete ('/order-items/:id',   validator.validateDeleteOne,validationResult,orderItemController.deleteOne);
module.exports = router;
