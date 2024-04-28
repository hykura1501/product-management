const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products-category.controller");

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controllers.index);

router.patch(
  "/change-status/:status/:id",
  controllers.changeStatus
);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.delete);

router.get("/edit/:id", controllers.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.uploadCloud,
  controllers.editPatch
);

router.get("/create", controllers.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadCloud,
  controllers.createPost
);

module.exports = router;
