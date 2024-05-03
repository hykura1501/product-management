const systemConfig = require("../../config/system");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
// [GET] /admin/recycle-bin
module.exports.index = async (req, res) => {
  const products = await Product.find({ deleted: true });
  const productsCategory = await ProductCategory.find({ deleted: true });
  const roles = await Role.find({ deleted: true });
  const accounts = await Account.find({ deleted: true });
  res.render("admin/pages/recycle-bin/index.pug", {
    pageTitle: "Thùng rác",
    products: products,
    productsCategory: productsCategory,
    roles: roles,
    accounts: accounts,
  });
};
// [PATCH] /admin/recycle-bin/restore/:type/:id
module.exports.restore = async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  switch (type) {
    case "products":
      await Product.updateOne({ _id: id }, { deleted: false });
      req.flash("success", "Bạn đã khôi phục sản phẩm thành công!");
      res.redirect("back");
      break;
    
    case "products-category":
      await ProductCategory.updateOne({ _id: id }, { deleted: false });
      req.flash("success", "Bạn đã khôi phục danh mục sản phẩm thành công!");
      res.redirect("back");
      break;

    default:
      break;
  }
};
// [DELETE] /admin/recycle-bin/delete/:type/:id
module.exports.delete = async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  switch (type) {
    case "products":
      await Product.deleteOne({ _id: id });
      req.flash("success", "Bạn đã xóa vĩnh viễn sản phẩm thành công!");
      res.redirect("back");
      break;

    default:
      break;
  }
};
