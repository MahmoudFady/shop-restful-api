const path = require("path");
const fs = require("fs");
const { getResErr } = require(path.join(
  __dirname,
  "..",
  "utils",
  "error.util"
));
const ProductModel = require(path.join(
  __dirname,
  "..",
  "models",
  "product.model"
));
const { uploadImage } = require(path.join(
  __dirname,
  "..",
  "utils",
  "upload-img.util"
));
const productsPerPage = 12;

exports.createOne = async (req, res, next) => {
  const newProduct = req.body;
  const image = req.files.image[0];
  try {
    if (!image) {
      throw getResErr("Not valid image.", 422);
    } else {
      newProduct.image = await uploadImage(image.path);
      fs.unlink(path.join(image.path));
    }
    const thumbnails = files.thumbnails;
    if (!thumbnails) {
      throw getResErr("Not valid thumbnails.", 422);
    } else {
      newProduct.thumbnails = [];
      for (thumbnail of thumbnails) {
        newProduct.thumbnails.push(await uploadImage(thumbnail.path));
        fs.unlink(path.join(thumbnail.path));
      }
      const product = await productService.createOne(req.files, req.body);
      res.status(201).json({ message: "product created", product });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const result = await new ProductModel(product).save();
    if (result.modifiedCount === 1) {
      res.status(201).json({ message: "product updated" });
    } else {
      throw new Error("Didn't modify!!");
    }
  } catch (error) {
    next(error);
  }
};

exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await ProductModel.findOne({ _id }).populate("reviews");
    res.status(200).json({ message: "ok", product });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategoryCount = async (req, res, next) => {
  try {
    const count = await ProductModel.countDocuments({
      category: req.params.category,
    });
    res.status(200).json({ message: "ok", count });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategory = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ category: req.params.category })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategoryPriceAsc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ category: req.params.category })
      .sort({ price: 1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategoryPriceDesc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ category: req.params.category })
      .sort({ price: -1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategoryCount = async (req, res, next) => {
  try {
    const count = await ProductModel.countDocuments({
      subCategory: req.params.subcategory,
    });
    res.status(200).json({ message: "ok", count });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategory = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      subCategory: req.params.subCategory,
    })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategoryPriceAsc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      subCategory: req.params.subCategory,
    })
      .sort({ price: 1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategoryPriceDesc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      subCategory: req.params.subCategory,
    })
      .sort({ price: -1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.getAllUnactiveProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ active: false });
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};
