const express = require("express")
const router = express.Router()
const controllers = require("../../controllers/client/cart.controller")

router.post('/add/:productId', controllers.addPost)
router.get('/update/:productId/:quantity', controllers.updateQuantity)
router.get('/', controllers.index)
router.get('/delete/:productId', controllers.delete)

module.exports = router