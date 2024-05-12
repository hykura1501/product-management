const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
//[GET] /cart
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

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartItems: cartItems,
  });
};

//[POST] /add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({ _id: cartId });
  const newPro = {
    product_id: productId,
    quantity: quantity,
  };
  if (cart) {
    const listPro = cart.products;
    const existPro = listPro.find((item) => item.product_id === productId);
    if (existPro) {
      await Cart.updateOne(
        { _id: cartId, "products.product_id": productId },
        {
          $set: {
            "products.$": {
              product_id: productId,
              quantity: existPro.quantity + quantity,
            },
          },
        }
      );
    } else {
      await Cart.updateOne({ _id: cartId }, { $push: { products: newPro } });
    }
  }
  res.redirect("back");
};

//[GET] /update/:productId/:quantity
module.exports.updateQuantity = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.params.quantity);
  const cartId = req.cookies.cartId;

  try {
    await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      {
        $set: {
          "products.$": {
            product_id: productId,
            quantity: quantity,
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  res.redirect("back");
};
//[GET] /delete/:productId
module.exports.delete = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;

  try {
    await Cart.updateOne(
      { _id: cartId },
      {
        $pull: {
          products: {
            product_id: productId
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("back");
};
