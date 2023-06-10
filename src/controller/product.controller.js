const path = require("path");
const fs = require("fs");
const productModel = require("../models/product.model");
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
const productsPerPage = 12;

exports.createOne = async (req, res, next) => {
  console.log(req.files);
  const newProduct = req.body;
  const image = req.files.image[0];
  try {
    if (!image) {
      throw getResErr("Not valid image.", 422);
    } else {
      newProduct.image = image.path;
    }
    const thumbnails = req.files.thumbnails;
    if (!thumbnails) {
      throw getResErr("Not valid thumbnails.", 422);
    } else {
      newProduct.thumbnails = [];
      for (thumbnail of thumbnails) {
        newProduct.thumbnails.push(thumbnail.path);
      }
      const product = await productModel.create(newProduct);
      res.status(201).json({ message: "product created", product });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const result = await ProductModel.updateOne(
      { _id: req.params.id },
      req.body
    );
    if (result.matchedCount === 1 && result.modifiedCount === 1) {
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
    const product = await ProductModel.findOne({ _id: req.params.id }).populate(
      "reviews"
    );
    res.status(200).json({ message: "ok", product });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategoryCount = async (req, res, next) => {
  try {
    const count = await ProductModel.countDocuments({
      category: req.params.category,
      active: true,
    });
    res.status(200).json({ message: "ok", count });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategory = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      category: req.params.category,
      active: true,
    })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage)
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 });
    res.status(200).json({ page: req.params.page, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategoryPriceAsc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      category: req.params.category,
      active: true,
    })
      .sort({ price: 1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage)
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 });
    res.status(200).json({ page: req.params.page, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInCategoryPriceDesc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      category: req.params.category,
      active: true,
    })
      .sort({ price: -1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage)
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 });
    res.status(200).json({ page: req.params.page, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategoryCount = async (req, res, next) => {
  try {
    const count = await ProductModel.countDocuments({
      subCategory: req.params.subcategory,
      active: true,
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
      active: true,
    })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage)
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 });
    res.status(200).json({ page: req.params.page, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategoryPriceAsc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      subCategory: req.params.subCategory,
      active: true,
    })
      .sort({ price: 1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage)
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 });
    res.status(200).json({ page: req.params.page, products });
  } catch (error) {
    next(error);
  }
};

exports.getProductsInSubCategoryPriceDesc = async (req, res, next) => {
  try {
    const products = await ProductModel.find({
      subCategory: req.params.subCategory,
      active: true,
    })
      .sort({ price: -1 })
      .skip((req.params.page - 1) * productsPerPage)
      .limit(productsPerPage)
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 });
    res.status(200).json({ page: req.params.page, products });
  } catch (error) {
    next(error);
  }
};

exports.getAllUnactiveProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ active: false }).select({
      title: 1,
      description: 1,
      price: 1,
      discount: 1,
      image: 1,
    });
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};

exports.productsSearch = async (req, res, next) => {
  try {
    const products = await productModel
      .find({ $text: { $search: req.params.text } })
      .select({ title: 1, description: 1, price: 1, discount: 1, image: 1 })
      .limit(productsPerPage);
    res.status(200).json({ message: "ok", products });
  } catch (error) {
    next(error);
  }
};
