const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/products-category.controller");

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/products-category", controllers.index);

router.patch(
  "/products-category/change-status/:status/:id",
  controllers.changeStatus
);

router.patch("/products-category/change-multi", controllers.changeMulti);

router.delete("/products-category/delete/:id", controllers.delete);

router.get("/products-category/edit/:id", controllers.edit);

router.patch(
  "/products-category/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.uploadCloud,
  controllers.editPatch
);

router.get("/products-category/create", controllers.create);
router.post(
  "/products-category/create",
  upload.single("thumbnail"),
  uploadCloud.uploadCloud,
  controllers.createPost
);

module.exports = router;
