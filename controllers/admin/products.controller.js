const Product = require("../../models/product.model");

module.exports.products = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Filter Status
  const filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status === req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    filterStatus[0].class = "active";
  }

  if (req.query.status) {
    find.status = req.query.status;
  }

  // End Filter Status

  //Search
  let keyword = ""
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i")
    find.title = regex
  }
  //End Search

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  });
};
