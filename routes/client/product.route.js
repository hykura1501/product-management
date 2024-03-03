const express = require("express")
const router = express.Router()

const productsController = require("../../controllers/client/product.controller")

router.get('/products', productsController.index)

module.exports = router