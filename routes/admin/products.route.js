const express = require("express")
const router = express.Router()

const productsController = require("../../controllers/admin/products.controller")

router.get('/products', productsController.products)

module.exports = router