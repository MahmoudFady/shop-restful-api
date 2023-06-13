const productModel = require("../models/product.model");
const errUtil = require("../utils/error.util");
const productProjecton = "-images -description -reviews -details ";
const getProductMainQuery = async (criteria = {}, query = {}) => {
  const { pageIndex = 1, pageSize = 10 } = query;

  const lengthPromise = productModel.countDocuments(criteria);
  const productsPromise = productModel
    .find(criteria)
    .select(productProjecton)
    .skip((parseInt(pageIndex) - 1) * parseInt(pageSize))
    .limit(parseInt(pageSize));

  const [length, products] = await Promise.all([
    lengthPromise,
    productsPromise,
  ]);

  return { products, length };
};

module.exports.getAll = async (req, res, next) => {
  try {
    const { products, length } = await getProductMainQuery({}, req.query);
    res.status(200).json({
      message: "get all products",
      length,
      products,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getByPriceRange = async (req, res, next) => {
  try {
    const { minPrice = 1, maxPrice = 1000 } = req.query;

    const { products, length } = await getProductMainQuery(
      {
        $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
      },
      req.query
    );
    res.status(200).json({
      message: "get products by price range",
      length,
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
    const { products, length } = await getProductMainQuery(criteria, req.query);
    res
      .status(200)
      .json({ message: "get products by search", length, products });
  } catch (err) {
    next(err);
  }
};
module.exports.getByCategory = async (req, res, next) => {
  try {
    const category = req.params["category"];
    const { products, length } = await getProductMainQuery(
      { category },
      req.query
    );
    res
      .status(200)
      .json({ message: "get products by category", length, products });
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
        : { stock: 0 };
    const { products, length } = await getProductMainQuery(
      criteria,
      req.query
    ).sort({
      stock: 1,
    });
    res
      .status(200)
      .json({ message: "get all product in stcok", length, products });
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
    const product = await productModel.findById(req.params["id"]).populate({
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
module.exports.filter = async (req, res, next) => {
  try {
    let {
      category = "",
      target = "",
      minPrice = 1,
      maxPrice = 10000,
    } = req.query;
    target = new RegExp(target, "i");
    const searchCriteria = {
      $or: [
        { category: { $regex: target } },
        {
          brand: { $regex: target },
        },
        { title: { $regex: target } },
        { description: { $regex: target } },
      ],
    };
    const priceCriteria = {
      $and: [{ price: { $gte: +minPrice } }, { price: { $lte: +maxPrice } }],
    };
    category = category == "all" ? "" : category;
    category = RegExp(category, "i");
    const categoryCriteria = { category: { $regex: category } };
    const { products, length } = await getProductMainQuery(
      {
        $and: [searchCriteria, priceCriteria, categoryCriteria],
      },
      req.query
    );
    res.status(200).json({
      message: "get product using filter",
      length,
      products,
    });
  } catch (err) {
    next(err);
  }
};
