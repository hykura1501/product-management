const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

router.get("/roles", controller.index);
router.get("/roles/create", controller.create);
router.post(
  "/roles/create",
  controller.createPost
);
router.delete("/roles/delete/:id", controller.delete);
router.get("/roles/detail/:id", controller.detail);
router.get("/roles/edit/:id", controller.edit);
router.patch("/roles/edit/:id", controller.editPatch);
router.get("/roles/permissions", controller.permissions);
router.patch("/roles/permissions", controller.permissionsPatch);

module.exports = router;
