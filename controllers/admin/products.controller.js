const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelper = require("../../helpers/createTree");
const configSystem = require("../../config/system");

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

  //Sort
  let sort = {};
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  } else {
    sort.position = "desc";
  }
  //End Sort

  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  for (item of products) {
    const userCreated = await Account.findOne({
      _id: item.createdBy.account_id,
    });
    if (userCreated) {
      item.userCreated = userCreated.fullName;
    }
    if (item.updatedBy.length > 0) {
      const userLastUpdated = await Account.findOne({
        _id: item.updatedBy.slice(-1)[0].account_id,
      });
      if (userLastUpdated) {
        item.userLastUpdated = userLastUpdated.fullName;
      }
    }
  }
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

  const newUpdate = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };

  await Product.updateOne(
    { _id: id },
    { status: status, $push: { updatedBy: newUpdate } }
  );
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
  res.redirect("back");
};
//[PATCH] Change multi status products
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  const newUpdate = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  switch (type) {
    case "active":
      await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { status: type }, $push: { updatedBy: newUpdate } }
      );
      req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { status: type }, $push: { updatedBy: newUpdate } }
      );
      req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
      break;

    case "delete":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          $set: {
            deleted: true,
            deletedAt: new Date(),
            $push: { updatedBy: newUpdate },
          },
        }
      );
      req.flash("success", "Xóa sản phẩm thành công!");
      break;
    case "change-position":
      for (item of ids) {
        const [id, position] = item.split("-");
        await Product.updateOne(
          { _id: id },
          { position: position, $push: { updatedBy: newUpdate } }
        );
      }
      req.flash("success", "Thay đổi vị trí sản phẩm thành công!");
      break;

    default:
      break;
  }
  res.redirect("back");
};
//[delete] delete product item
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  const deletedBy = {
    account_id: res.locals.user.id,
    deletedAt: new Date(),
  };
  await Product.updateOne({ _id: id }, { deleted: true, deletedBy: deletedBy });
  req.flash("success", "Xóa sản phẩm thành công!");
  res.redirect("back");
};

//[Get] create product
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({ deleted: false });

  const category = createTreeHelper.tree(records);

  res.render("admin/pages/products/create", {
    pageTitle: "Trang tạo mới sản phẩm",
    category: category,
  });
};

//[post] create product
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const maxPosition = await Product.findOne({}).sort({ position:"desc" }).limit(1).select("position");
    req.body.position = maxPosition.position + 1;
  }
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };
  const product = new Product(req.body);
  await product.save();
  req.flash("success", "Đã tạo sản phẩm thành công!");
  res.redirect(`${configSystem.prefixAdmin}/products`);
};

//[Get] edit product
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
  };
  try {
    const product = await Product.findOne(find);

    const records = await ProductCategory.find({ deleted: false });

    const index = records.findIndex((item) => {
      return item.id === product.product_category_id;
    });

    if (index !== -1) records[index].isTrue = true;

    const category = createTreeHelper.tree(records);

    res.render("admin/pages/products/edit", {
      pageTitle: "Trang chỉnh sửa sản phẩm",
      product: product,
      category: category,
    });
  } catch (error) {
    if (error) {
      res.redirect(`${configSystem.prefixAdmin}/products`);
    }
  }
};

//[patch] edit product
module.exports.editPatch = async (req, res) => {
  const newUpdate = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  try {
    await Product.updateOne(
      { _id: id },
      { ...req.body, $push: { updatedBy: newUpdate } }
    );
    req.flash("success", "Cập nhật sản phẩm thành công!");
  } catch (error) {
    req.flash("success", "Cập nhật sản phẩm thất bại!");
  }
  res.redirect(`${configSystem.prefixAdmin}/products/edit/${id}`);
};

//[get] detail product
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
  };
  try {
    const product = await Product.findOne(find);

    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
      });
      if (category) {
        product.category = category.title;
      }
    }

    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    if (error) {
      // console.log(error);
      res.redirect(`${configSystem.prefixAdmin}/products`);
    }
  }
};
