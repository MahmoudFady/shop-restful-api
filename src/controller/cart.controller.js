const cartUseCase = require("../usercases/cart.usecase");
module.exports.getCartByUserId = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const cart = await cartUseCase.getCartByUserId(userId);
    res.status(200).json({
      message: "get user cart",
      cart,
    });
  } catch (err) {
    next(err)
  }
};
module.exports.createOne = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const { productId } = req.params;
    const productPrice = +req.query["productPrice"];
    const cart = await cartUseCase.createOne(userId, productId, productPrice);
    res.status(200).json({
      message: "cart created , product add to cart",
      cart,
    });
  } catch (err) {
    next(err)
  }
};
module.exports.deleteCartByUserId = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const cart = await cartUseCase.deleteCartByUserId(userId);
    res.status(200).json({
      message: "product removed",
      cart,
    });
  } catch (err) {
    next(err)
  }
};
module.exports.pushProduct = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const { productId } = req.params;
    const productPrice = +req.query["productPrice"];
    const cart = await cartUseCase.pushProduct(userId, productId, productPrice);
    res.status(200).json({
      message: "product add to cart",
      cart,
    });
  } catch (err) {
    next(err)
  }
};
module.exports.removeProduct = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.params;
    const productPrice = +req.query["productPrice"];
    const productQuantity = +req.query["productQuantity"];
    const cart = await cartUseCase.removeProduct(
      userId,
      productId,
      productPrice,
      productQuantity
    );
    res.status(200).json({
      message: "product removed form cart",
      cart,
    });
  } catch (err) {
    next(err)
  }
};
module.exports.updateProductQuan = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.params;
    let increaser = +req.query["increaser"];
    let productPrice = +req.query["productPrice"];
    const cart = await cartUseCase.updateProductQuantity(
      userId,
      productId,
      productPrice,
      increaser
    );
    res.status(200).json({
      message: "product quantity updated",
      cart,
    });
  } catch (err) {
    next(err)
  }
};
