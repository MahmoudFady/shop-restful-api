const express = require ('express');
const router = express.Router ();
const shippingController = require ('../controller/shipping.controller');
const validationResult = require ('../middlewares/validations/validation-result');
const validator = require ('../middlewares/validations/shipping.validator');
router.post ('/shippings', shippingController.createOne);
router.get ('/shippings', shippingController.getAll);
router.get ('/shippings/:id', shippingController.getOne);
router.patch ('/shippings/:id', shippingController.updateOne);
router.delete ('/shippings/:id', shippingController.deleteOne);

// //with Validation
// router.post ('/shippings', validator.validateCreateOne,validationResult,shippingController.createOne);
// router.get ('/shippings',  shippingController.getAll);
// router.get ('/shippings/:id',  validator.validateGetOne,validationResult,shippingController.getOne);
// router.patch ('/shippings/:id',    validator.validateUpdateOne,validationResult,shippingController.updateOne);
// router.delete ('/shippings/:id',   validator.validateDeleteOne,validationResult,shippingController.deleteOne);
module.exports = router;
