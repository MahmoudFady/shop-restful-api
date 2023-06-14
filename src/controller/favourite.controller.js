const favouriteModel = require("../models/favourite.model");
const productProjecton = "-images -description -reviews -details ";

module.exports.push = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const productId = req.params["productId"];
    let favs = await favouriteModel.findOneAndUpdate(
      { user: userId },
      {
        $addToSet: { products: productId },
      }
    );
    if (!favs) {
      favs = await new favouriteModel({
        user: userId,
        products: [productId],
      }).save();
    }
    res.status(201).json({
      message: "product add to favs",
    });
  } catch (err) {
    next(err);
  }
};
module.exports.pop = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const productId = req.params["productId"];
    await favouriteModel.updateOne(
      {
        user: userId,
      },
      {
        $pull: { products: productId },
      }
    );
    res.status(200).json({
      message: "product removed form favs",
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getUserFavs = async (req, res, next) => {
  try {
    let result = await favouriteModel
      .findOne({
        user: req.user["id"],
      })
      .populate({
        path: "products",
        select: productProjecton,
      });
    res.status(200).json({
      message: "get user favs",
      products: result ? result.products : [],
      ids: result ? result.products.map((p) => p._id) : [],
    });
  } catch (err) {
    next(err);
  }
};
