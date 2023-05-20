const express = require ('express');
const router = express.Router ();
const userController = require ('../controller/user.controller');
const validationResult = require ('../middlewares/validations/validation-result');
const validator = require ('../middlewares/validations/user.validator');

router.post ('/register', userController.signup);
router.get ('/login', userController.signin);
router.get ('/users/:id', userController.getOne);
router.patch ('/users/:id', userController.updateOne);
router.delete ('/users/:id', userController.deleteOne);

// //with Validation
// router.post ('/register', validator.validateSignUp,validationResult,userController.signup);
// router.post ('/login', validator.validateSignIn,validationResult,userController.createOne.signin);
// router.get ('/users/:id',  validator.validateGetOne,validationResult,userController.getOne);
// router.patch ('/users/:id',    validator.validateUpdateOne,validationResult,userController.updateOne);
// router.delete ('/users/:id',   validator.validateDeleteOne,validationResult,userController.deleteOne);
module.exports = router;
