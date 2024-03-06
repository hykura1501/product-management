const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

module.exports.products = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Filter Status
  const filterStatus = filterStatusHelper(req.query)

  if (req.query.status) {
    find.status = req.query.status;
  }
  // End Filter Status


  
  //Search
  const objectSearch = searchHelper(req.query)
  if(objectSearch.keyword) {
    find.title = objectSearch.regex
  }
  //End Search

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword
  });
};
