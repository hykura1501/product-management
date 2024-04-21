const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/accounts", controller.index);
router.get("/accounts/create", controller.create);
router.patch("/accounts/change-status/:status/:id", controller.changeStatus);
router.post(
  "/accounts/create",
  upload.single("avatar"),
  uploadCloud.uploadCloud,
  controller.createPost
);
router.get("/accounts/edit/:id", controller.edit);
router.get("/accounts/detail/:id", controller.detail);
router.delete("/accounts/delete/:id", controller.delete);
router.patch(
  "/accounts/edit/:id",
  upload.single("avatar"),
  uploadCloud.uploadCloud,
  controller.editPatch
);
module.exports = router;
