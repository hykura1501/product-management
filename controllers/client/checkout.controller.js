const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");
//[GET] /checkout
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({ _id: req.cookies.cartId });
  const cartItems = cart.products;
  cartItems.totalPrice = 0;
  for (const item of cartItems) {
    const productInfor = await Product.findOne({
      deleted: false,
      status: "active",
      _id: item.product_id,
    });
    item.productInfor = productInfor;
    item.newPrice = Math.floor(
      item.productInfor.price * (1 - item.productInfor.discountPercentage / 100)
    );
    item.totalPrice = item.quantity * item.newPrice;
    cartItems.totalPrice += item.totalPrice;
  }
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartItems: cartItems,
  });
};
//[POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfor = {
    fullName: req.body.fullName,
    phone: req.body.phone,
    address: req.body.address,
  };
  let products = [];
  const cart = await Cart.findOne({ _id: cartId });
  if (cart) {
    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id,
      });
      products.push({
        product_id: item.product_id,
        price: product.price,
        discountPercentage: product.discountPercentage,
        quantity: item.quantity,
      });
    }
  }
  const order = new Order({
    cart_id: cartId,
    userInfor: userInfor,
    products: products,
  });

  await order.save();

  await Cart.updateOne({ _id: cartId }, { products: [] });
  res.redirect(`/checkout/order/success/${order.id}`);
};
//[GET] /checkout/order/success/:orderId
module.exports.success = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.orderId });
  order.totalPrice = 0;
  for(const item of order.products) {
    const productInfor = await Product.findOne({_id: item.product_id})
    item.productInfor = productInfor;
    item.priceNew = item.price * (1 - item.discountPercentage/100);
    item.totalPrice = item.priceNew * item.quantity;
    order.totalPrice += item.totalPrice
  }
  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
  });
};
