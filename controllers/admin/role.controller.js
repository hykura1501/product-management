const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await Role.find(find);
  for (const item of records) {
    const userCreated = await Account.findOne({
      _id: item.createdBy.account_id,
    });
    if (userCreated) {
      item.userCreated = userCreated.fullName;
    }
    if(item.updatedBy.length > 0) {
      const lastUserUpdated = await Account.findOne({
        _id: item.updatedBy.slice(-1)[0].account_id,
      });
      if(lastUserUpdated) {
        item.lastUserUpdated = lastUserUpdated.fullName
      }
    }
  }
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền",
  });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };
  const record = new Role(req.body);

  await record.save();

  req.flash("success", "Tạo nhóm quyền thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [DELETE] /admin/roles/delete
module.exports.delete = async (req, res) => {
  const deletedBy = {
    account_id: res.locals.user.id,
    deletedAt: new Date(),
  };
  const id = req.params.id;
  await Role.updateOne({ _id: id }, { deleted: true, deletedBy: deletedBy });
  req.flash("success", "Xóa nhóm quyền thành công!");
  res.redirect("back");
};
// [GET] /admin/roles/detail
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  try {
    const record = await Role.findOne({ _id: id, deleted: false });
    res.render("admin/pages/roles/detail", {
      pageTitle: record.title,
      record: record,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
// [GET] /admin/roles/edit
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const record = await Role.findOne({ _id: id, deleted: false });
    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      record: record,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
// [PATCH] /admin/roles/edit
module.exports.editPatch = async (req, res) => {
  const newUpdated = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  const id = req.params.id;
  try {
    await Role.updateOne(
      { _id: id },
      { ...req.body, $push: { updatedBy: newUpdated } }
    );
    req.flash("success", "Cập nhật thành công!");
    res.redirect("back");
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  const records = await Role.find({ deleted: false });
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records,
  });
};
// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const newUpdated = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne(
      { _id: item.id },
      { permissions: item.permissions, $push: { updatedBy: newUpdated } }
    );
  }
  req.flash("success", "Cập nhật thành công!")
  res.redirect("back");
};
