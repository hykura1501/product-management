const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/admin/products.controller");
const validate = require("../../validates/product.validate");

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/products", productsController.products);

router.patch(
  "/products/change-status/:status/:id",
  productsController.changeStatus
);

router.patch("/products/change-multi", productsController.changeMulti);

router.delete("/products/delete/:id", productsController.delete);

router.get("/products/create", productsController.create);

router.post(
  "/products/create",
  upload.single("thumbnail"),
  uploadCloud.uploadCloud,
  validate.createPost,
  productsController.createPost
);

router.get("/products/edit/:id", productsController.edit);

router.patch(
  "/products/edit/:id",
  upload.single("thumbnail"), 
  uploadCloud.uploadCloud,
  validate.createPost,
  productsController.editPatch
);

router.get("/products/detail/:id", productsController.detail);

module.exports = router;
