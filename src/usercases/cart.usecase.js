const cartDbAccess = require("../db-access/cart.db-access");
module.exports.createOne = (userId, productId, productPrice) => {
  return cartDbAccess.createOne(userId, productId, productPrice);
};
module.exports.getCartByUserId = (userId) => {
  return cartDbAccess.getCartByUserId(userId);
};
module.exports.deleteCartByUserId = (userId) => {
  return cartDbAccess.deleteCartByUserId(userId);
};
module.exports.pushProduct = (userId, productId, productPrice) => {
  return cartDbAccess.pushProduct(userId, productId, productPrice);
};
module.exports.removeProduct = async (
  userId,
  productId,
  productPrice,
  productQuantity
) => {
  let updatedCart = await cartDbAccess.removeProduct(
    userId,
    productId,
    productPrice * productQuantity
  );
  return updatedCart;
};
module.exports.updateProductQuantity = async (
  userId,
  productId,
  productPrice,
  quan
) => {
  const updatedCart = await cartDbAccess.updateProductQuantity(
    userId,
    productId,
    productPrice,
    quan
  );
  return updatedCart;
};
