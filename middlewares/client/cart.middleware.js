const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
  const cartId = req.cookies.cartId;
  if (!cartId) {
    const cart = new Cart();
    const expireTime = 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, { maxAge: expireTime });
    await cart.save()
  }else {
    const cart = await Cart.findOne({_id: cartId});
    const products = cart.products;
    const totalProducts = products.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
    res.locals.totalProducts = totalProducts
  }
  
  next();
};
