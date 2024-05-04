const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/profile.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/edit", controller.edit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.uploadCloud,
  controller.editPatch
);
module.exports = router;
