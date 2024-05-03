const systemConfig = require("../../config/system");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
// [GET] /admin/recycle-bin

const getUserDeleted = async (items) => {
  for (const item of items) {
    const userDeleted = await Account.findOne({
      _id: item.deletedBy.account_id,
    });
    if(userDeleted) {
      item.userDeleted = userDeleted.fullName
    }
  }
  return items
};

module.exports.index = async (req, res) => {
  let products = await Product.find({ deleted: true });
  let productsCategory = await ProductCategory.find({ deleted: true });
  let roles = await Role.find({ deleted: true });
  let accounts = await Account.find({ deleted: true });
  products = await getUserDeleted(products)
  productsCategory = await getUserDeleted(productsCategory)
  roles = await getUserDeleted(roles)
  accounts = await getUserDeleted(accounts)
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
    case "roles":
      await Role.updateOne({ _id: id }, { deleted: false });
      req.flash("success", "Bạn đã khôi phục nhóm quyền thành công!");
      res.redirect("back");
      break;
    case "accounts":
      await Account.updateOne({ _id: id }, { deleted: false });
      req.flash("success", "Bạn đã khôi phục tài khoản thành công!");
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
    case "products-category":
      await ProductCategory.deleteOne({ _id: id });
      req.flash("success", "Bạn đã xóa vĩnh viễn danh mục sản phẩm thành công!");
      res.redirect("back");
      break;
    case "roles":
      await Role.deleteOne({ _id: id });
      req.flash("success", "Bạn đã xóa vĩnh viễn nhóm quyền thành công!");
      res.redirect("back");
      break;
    case "accounts":
      await Account.deleteOne({ _id: id });
      req.flash("success", "Bạn đã xóa vĩnh viễn tài khoản thành công!");
      res.redirect("back");
      break;

    default:
      break;
  }
};
