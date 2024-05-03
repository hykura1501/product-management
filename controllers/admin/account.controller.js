const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await Account.find(find).select("-password -token");
  for (let record of records) {
    const role = await Role.findOne({ _id: record.role_id, deleted: false });
    if (role) {
      record.role = role;
    }
    const userCreated = await Account.findOne({
      _id: record.createdBy.account_id,
    });
    if (userCreated) {
      record.userCreated = userCreated.fullName;
    }
    if (record.updatedBy.length > 0) {
      const lastUserUpdated = await Account.findOne({
        _id: record.updatedBy.slice(-1)[0].account_id,
      });
      if(lastUserUpdated) {
        record.lastUserUpdated = lastUserUpdated.fullName
      }
    }
  }
  res.render("admin/pages/account/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

// [PACTH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const newUpdated = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  try {
    await Account.updateOne(
      { _id: req.params.id },
      { status: req.params.status, $push: { updatedBy: newUpdated } }
    );
    req.flash("success", "Cập nhật trạng thái tài khoản thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("success", "Cập nhật trạng thái thất bại!");
    req.flash("back");
  }
};
// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/create", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  const createdBy = {
    account_id: res.locals.user.id,
  };
  req.body.createdBy = createdBy;
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", "Email đã tồn tại!");
  } else {
    const account = new Account(req.body);
    await account.save();
  }
  req.flash("success", "Tạo tài khoản thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/accounts`);
};
// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const record = await Account.findOne({ _id: id });
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/edit", {
    pageTitle: "Cập nhật tài khoản",
    record: record,
    roles: roles,
  });
};
// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const newUpdated = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  const id = req.params.id;
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", "Email đã tồn tại!");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne(
      { _id: id },
      { ...req.body, $push: { updatedBy: newUpdated } }
    );
    req.flash("success", "Cập nhật tài khoản thành công!");
  }
  res.redirect("back");
};
// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const record = await Account.findOne({ _id: id, deleted: false });
  const role = await Role.findOne({ _id: record.role_id, deleted: false });
  record.role = role;
  res.render("admin/pages/account/detail", {
    pageTitle: "Chi tiết tài khoản",
    record: record,
  });
};
// [DELETE] /admin/accounts/delete/:id
module.exports.delete = async (req, res) => {
  const deletedBy = {
    account_id: res.locals.user.id,
    deletedAt: new Date(),
  };
  req.body.deletedBy = deletedBy;
  const id = req.params.id;
  await Account.updateOne({ _id: id }, { deleted: true, deletedBy: deletedBy });
  req.flash("success", "Xóa tài khoản thành công!");
  res.redirect("back");
};
