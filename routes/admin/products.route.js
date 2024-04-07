const express = require("express")
const router = express.Router()

const productsController = require("../../controllers/admin/products.controller")

router.get('/products', productsController.products)
router.patch('/products/change-status/:status/:id', productsController.changeStatus)

module.exports = router