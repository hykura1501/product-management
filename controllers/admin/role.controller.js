const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await Role.find(find);
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
  const record = new Role(req.body);

  await record.save();

  req.flash("success", "Tạo nhóm quyền thành công!")
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [DELETE] /admin/roles/delete
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
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
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
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
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
};
// [PATCH] /admin/roles/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  try {
    await Role.updateOne({ _id: id}, req.body );
    req.flash("success", "Cập nhật thành công!")
    res.redirect("back")
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
};
// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  const records = await Role.find({deleted: false})
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    records: records
  });
};
// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions)
  for (const item of permissions) {
    await Role.updateOne({_id: item.id}, {permissions: item.permissions})
  }
  res.redirect("back")
};
