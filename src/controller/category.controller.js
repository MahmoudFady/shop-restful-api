const categoryModel = require("../models/category.model");
const errUtil = require("../utils/error.util");

module.exports.getAll = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ message: "get all categories", categories });
  } catch (err) {
    next(err);
  }
};

module.exports.createOne = async (req, res, next) => {
  try {
    const category = await new categoryModel(req.body).save();
    res.status(200).json({ message: "category created", id: category._id });
  } catch (err) {
    next(err);
  }
};
module.exports.addSubCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { categories: req.body.subCategory },
    });
    if (!category) throw errUtil("category does not exist", 404);
    res.status(200).json({ message: "subCategory added" });
  } catch (err) {
    next(err);
  }
};
module.exports.pullSubCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(req.params.id, {
      $pull: { categories: req.query.subCategory },
    });
    if (!category) throw errUtil("category does not exist", 404);
    res.status(200).json({ message: "subCategory removed" });
  } catch (err) {
    next(err);
  }
};
module.exports.editSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { old, updated } = req.query;
    const category = await categoryModel.updateOne(
      { _id: id, "categories.$": old },
      {
        $set: {
          "categories.$": updated,
        },
      }
    );
    if (!category) throw errUtil("category does not exist", 404);
    res.status(200).json({ message: "subCategory updated" });
  } catch (err) {
    next(err);
  }
};
