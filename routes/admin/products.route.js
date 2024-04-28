const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/admin/products.controller");
const validate = require("../../validates/product.validate");

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", productsController.products);

router.patch(
  "/change-status/:status/:id",
  productsController.changeStatus
);

router.patch("/change-multi", productsController.changeMulti);

router.delete("/delete/:id", productsController.delete);

router.get("/create", productsController.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.uploadCloud,
  validate.createPost,
  productsController.createPost
);

router.get("/edit/:id", productsController.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"), 
  uploadCloud.uploadCloud,
  validate.createPost,
  productsController.editPatch
);

router.get("/detail/:id", productsController.detail);

module.exports = router;
