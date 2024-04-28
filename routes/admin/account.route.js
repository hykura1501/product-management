const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadCloud,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.get("/detail/:id", controller.detail);
router.delete("/delete/:id", controller.delete);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.uploadCloud,
  controller.editPatch
);
module.exports = router;
