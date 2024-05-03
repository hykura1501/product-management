const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/recycle-bin.controller");

router.get("/", controller.index);
router.patch("/restore/:type/:id", controller.restore);
router.delete("/delete/:type/:id", controller.delete);

module.exports = router;
