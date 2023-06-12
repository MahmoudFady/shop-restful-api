const productModel = require("../models/product.model");
const errUtil = require("../utils/error.util");
const productProjecton = "-thumbnails -reviews -details ";
const getProductMainQuery = (criteria, query) => {
  criteria = criteria || {};
  let { pageIndex, pageSize } = query;
  pageIndex = +pageIndex || 1;
  pageSize = +pageSize || 20;
  return productModel
    .find(criteria)
    .populate({ path: "category", select: "name" })
    .select(productProjecton)
    .skip(pageIndex - 1 * pageSize)
    .limit(pageSize);
};
module.exports.getAll = async (req, res, next) => {
  try {
    const products = await getProductMainQuery({}, req.query);
    res.status(200).json({
      message: "get all products",
      pageIndex,
      products,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getByPriceRange = async (req, res, next) => {
  try {
    const { minPrice, maxPrice } = req.query;
    minPrice = +minPrice || 1;
    maxPrice = +maxPrice || 1000;
    const products = await getProductMainQuery(
      {
        $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
      },
      req.query
    );
    res.status(200).json({
      message: "get products by price range",
      products,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getBySearch = async (req, res, next) => {
  try {
    let { target } = req.query;
    target = new RegExp(target, "i");
    const criteria = {
      $or: [
        {
          brand: { $regex: target },
        },
        { title: { $regex: target } },
        {
          subCategory: { $regex: target },
        },
        { description: { $regex: target } },
      ],
    };
    const products = await getProductMainQuery(criteria, req.query);
    res.status(200).json({ message: "get products by search", products });
  } catch (err) {
    next(err);
  }
};
module.exports.getByCategory = async (req, res, next) => {
  try {
    const category = req.params["category"];
    const products = await getProductMainQuery({ category }, req.query);
    res.status(200).json({ message: "get products by category", products });
  } catch (err) {
    next(err);
  }
};
module.exports.getByStockState = async (req, res, next) => {
  try {
    const state = req.params["state"];
    const criteria =
      state == "in"
        ? {
            stockCount: { $gte: 1 },
          }
        : { stockCount: 0 };
    const products = await getProductMainQuery(criteria, req.query).sort({
      stockCount: 1,
    });
    res.status(200).json({ message: "get all product in stcok", products });
  } catch (err) {
    next(err);
  }
};
module.exports.addOne = async (req, res, next) => {
  try {
    const data = req.body;
    data.image =
      req.protocol +
      "://" +
      req.get("host") +
      "uploads/" +
      req.files["image"][0].filename;
    data.thumbnails = req.files["thumbnails"].map((file) => {
      return (
        req.protocol + "://" + req.get("host") + "uploads/" + file.filename
      );
    });
    const product = await new productModel(data).save();
    res.state(201).json({ message: "product added", product });
  } catch (err) {
    next(err);
  }
};
module.exports.getById = async (req, res, next) => {
  try {
    const product = await productModel
      .findById(req.params["id"])
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name image",
        },
      });
    if (!product) errUtil("product does not exist", 404);
    res.status(200).json({ message: "get product by id", product });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteOne = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) errUtil("product does not exist", 404);
    res.status(200).json({ message: "delete product by id" });
  } catch (err) {
    next(err);
  }
};
module.exports.updateOne = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) errUtil("product does not exist", 404);
    res.status(200).json({ message: "product updated", product });
  } catch (err) {
    next(err);
  }
};
