const Product = require("../../models/product.model");
//[GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let result = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    result = await Product.find({
      deleted: false,
      status: "active",
      title: keywordRegex,
    });
  }
  // console.log(result);
  res.render("client/pages/products/index", {
    pageTitle: "Sản phẩm tìm kiếm",
    products: result,
    keyword: keyword
  });
};
