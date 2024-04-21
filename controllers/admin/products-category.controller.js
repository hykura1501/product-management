const ProductCategory = require("../../models/product-category.model");
const configSystem = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const createTreeHelper = require("../../helpers/createTree");

//[GET] Get products-category
module.exports.index = async (req, res) => {
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

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: newRecords,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};

//[PATCH] Change status product
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await ProductCategory.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
  res.redirect("back");
};

//[PATCH] Change multi status products
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await ProductCategory.updateMany(
        { _id: { $in: ids } },
        { $set: { status: type } }
      );
      req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
      break;
    case "inactive":
      await ProductCategory.updateMany(
        { _id: { $in: ids } },
        { $set: { status: type } }
      );
      req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
      break;

    case "delete":
      await ProductCategory.updateMany(
        { _id: { $in: ids } },
        { $set: { deleted: true, deletedAt: new Date() } }
      );
      req.flash("success", "Xóa sản phẩm thành công!");
      break;
    case "change-position":
      for (item of ids) {
        const [id, position] = item.split("-");
        await ProductCategory.updateOne({ _id: id }, { position: position });
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
  await ProductCategory.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  req.flash("success", "Xóa sản phẩm thành công!");
  res.redirect("back");
};

//[Get] edit product
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
  };
  try {

    const records = await ProductCategory.find({deleted: false});
    const record = await ProductCategory.findOne(find);
    
    const index = records.findIndex((item) => {
      return item.id === record.parent_id
    })
    if(index !== -1) 
      records[index].isTrue = true

    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/edit", {
      pageTitle: "Trang chỉnh sửa danh mục sản phẩm",
      record: record,
      records: newRecords,
    });
  } catch (error) {
    if (error) {
      res.redirect(`${configSystem.prefixAdmin}/products-category`);
    }
  }
};

//[patch] edit product-category
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  try {
    await ProductCategory.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công!");
  } catch (error) {
    req.flash("success", "Cập nhật sản phẩm thất bại!");
  }
  res.redirect(`${configSystem.prefixAdmin}/products-category/edit/${id}`);
};

//[GET] create products-category
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};

//[POST] create products-category
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }
  const records = new ProductCategory(req.body);
  await records.save();
  req.flash("success", "Đã tạo sản phẩm thành công!");
  res.redirect(`${configSystem.prefixAdmin}/products-category`);
};
