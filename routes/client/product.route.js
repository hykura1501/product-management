const express = require("express")
const router = express.Router()

const productsController = require("../../controllers/client/product.controller")

router.get('/', productsController.index)
// router.get('/:slug', productsController.detail)
router.get('/:slugCategory', productsController.category)
router.get('/detail/:slugProduct', productsController.detail)

module.exports = router