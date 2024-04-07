const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

//[GET] Get products
module.exports.products = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Filter Status
  const filterStatus = filterStatusHelper(req.query);

  if (req.query.status) {
    find.status = req.query.status;
  }
  // End Filter Status

  //Search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.keyword) {
    find.title = objectSearch.regex;
  }
  //End Search

  //Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      limitItem: 4,
      currentPage: 1,
    },
    countProducts,
    req.query
  );
  //End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

//[PATCH] Change status product
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("back");
};
//[PATCH] Change multi status products
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const id = req.body.ids.split(", ");
  switch (type) {
    case 'active':
      await Product.updateMany(
        { _id: { $in: id } },
        { $set: { status: type } }
      );
      break;
    case 'inactive':
      await Product.updateMany(
        { _id: { $in: id } },
        { $set: { status: type } }
      );
      break;
    
    default:
      break;
  }
  
  res.redirect('back')
};
