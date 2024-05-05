const Product = require("../../models/product.model");
//[GET] /
module.exports.index = async (req, res) => {
  const productFeatured = await Product.find({
    deleted: false,
    status: "active",
    featured: "1",
  }).limit(4);
  const productNew = await Product.find({
    deleted: false,
    status: "active",
  })
    .limit(4)
    .sort({ position: "desc" });

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: productFeatured,
    productNew: productNew,
  });
};
