const productModel = require("../models/product.model");
module.exports.createOne = async (req, res, next) => {
  try {
    const product = await new productModel(req.body).save();
    res.status(200).json({ message: "product created", id: product.id });
  } catch (err) {
    next(err);
  }
};
