const express = require("express")
const router = express.Router()
const multer  = require('multer')
const storageMulterHelper = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulterHelper()})

const productsController = require("../../controllers/admin/products.controller")
const validate = require("../../validates/product.validate")

router.get('/products', productsController.products)
router.patch('/products/change-status/:status/:id', productsController.changeStatus)
router.patch('/products/change-multi', productsController.changeMulti)
router.delete('/products/delete/:id', productsController.delete)
router.get('/products/create', productsController.create)
router.post(
    '/products/create', 
    upload.single('thumbnail'), 
    validate.createPost,
    productsController.createPost
)
router.get('/products/edit/:id', productsController.edit)
router.patch(
    '/products/edit/:id', 
    upload.single('thumbnail'), 
    validate.createPost,
    productsController.editPatch
)

module.exports = router