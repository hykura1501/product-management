const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/chat.controller");

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const chatMiddleware = require("../../middlewares/client/chat.middleware");

router.get("/", controllers.index);
router.get("/:roomChatId", chatMiddleware.isAccess, controllers.roomChat);
router.post(
  "/create-group-chat",
  upload.single("avatar"),
  uploadCloud.uploadCloud,
  controllers.createGroupChat
);

module.exports = router;
