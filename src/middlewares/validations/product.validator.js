const { param, body } = require("express-validator");

module.exports.addProductValidator = [
  body("title")
    .trim()
    .exists()
    .withMessage("Insert product title!!.")
    .isString()
    .withMessage("Not valid title!!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 to 100 char long."),
  body("description")
    .trim()
    .exists()
    .withMessage("Insert product description!!.")
    .isString()
    .withMessage("Not valid description!!")
    .isLength({ min: 3, max: 300 })
    .withMessage("Title must be between 3 to 300 char long."),
  body("price")
    .exists()
    .withMessage("Insert product price!!.")
    .isInt()
    .withMessage("Not valid price!!")
    .isNumeric({ min: 0, max: 100000 })
    .withMessage("price must be between 0-100,000!!"),
  body("stockCount")
    .exists()
    .withMessage("Insert product stockCount!!.")
    .isInt()
    .withMessage("Not valid stockCount!!")
    .isNumeric({ min: 0, max: 100000 })
    .withMessage("stockCount must be between 0-100,000!!"),
  body("discount")
    .optional()
    .isInt()
    .withMessage("Not valid discount!!")
    .isNumeric({ min: 0, max: 100 })
    .withMessage("price must be between 0-100!!"),
  body("category")
    .exists()
    .withMessage("Insert product category!!.")
    .isMongoId()
    .withMessage("Not valid category!!"),
  body("subCategory")
    .trim()
    .exists()
    .withMessage("Insert product subCategory!!.")
    .isString()
    .withMessage("Not valid subCategory!!")
    .isLength({ min: 3, max: 100 })
    .withMessage("subCategory must be between 3 to 100 char long."),
  body("details")
    .exists()
    .withMessage("Insert product details!!.")
    .isObject()
    .withMessage("Not valid details!!"),
  body("sku")
    .trim()
    .exists()
    .withMessage("Insert product sku!!.")
    .isString()
    .withMessage("Not valid sku!!")
    .isLength({ min: 10, max: 20 })
    .withMessage("sku must be between 10 to 20 char long."),
  body("active").optional().isBoolean().withMessage("Not valid active state!!"),
];

module.exports.updateProductValidator = [
  body("title")
    .trim()
    .optional()
    .isString()
    .withMessage("Not valid title!!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 to 100 char long."),
  body("description")
    .trim()
    .optional()
    .isString()
    .withMessage("Not valid description!!")
    .isLength({ min: 3, max: 300 })
    .withMessage("Title must be between 3 to 300 char long."),
  body("price")
    .optional()
    .isFloat()
    .withMessage("Not valid price!!")
    .isNumeric({ min: 0, max: 100000 })
    .withMessage("price must be between 0-100,000!!"),
  body("stockCount")
    .optional()
    .isInt()
    .withMessage("Not valid stockCount!!")
    .isNumeric({ min: 0, max: 100000 })
    .withMessage("stockCount must be between 0-100,000!!"),
  body("discount")
    .optional()
    .isFloat()
    .withMessage("Not valid discount!!")
    .isNumeric({ min: 0, max: 100 })
    .withMessage("price must be between 0-100!!"),
  body("category").optional().isMongoId().withMessage("Not valid category!!"),
  body("subCategory")
    .trim()
    .optional()
    .isString()
    .withMessage("Not valid subCategory!!")
    .isLength({ min: 3, max: 100 })
    .withMessage("subCategory must be between 3 to 100 char long."),
  body("details").optional().isObject().withMessage("Not valid details!!"),
  body("sku")
    .trim()
    .optional()
    .isString()
    .withMessage("Not valid sku!!")
    .isLength({ min: 10, max: 20 })
    .withMessage("sku must be between 10 to 20 char long."),
  body("active").optional().isBoolean().withMessage("Not valid active state!!"),
];

module.exports.paramCategoryValidator = [
  param("category").isMongoId().withMessage("Not valid category!!"),
  param("page")
    .isInt()
    .withMessage("Not valid page number!!")
    .isNumeric({ min: 1 })
    .withMessage("page number must be 1 or plus!!"),
];

module.exports.paramSubcategoryValidator = [
  param("subcategory").isMongoId().withMessage("Not valid subcategory!!"),
  param("page")
    .isInt()
    .withMessage("Not valid page number!!")
    .isNumeric({ min: 1 })
    .withMessage("page number must be 1 or plus!!"),
];



