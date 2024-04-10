const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {

    const find = {
        deleted: false,
        status: "active"
    }

    const products = await Product.find(find).sort({position: 'desc'})

    res.render('client/pages/products/index', {
        pageTitle: "Danh sách sản phẩm",
        products: products
    })
}

module.exports.detail = async (req, res) => {
    try {
        const product = await Product.findOne({
            deleted: false,
            status: "active",
            slug: req.params.slug
        })
        res.render('client/pages/products/detail', {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect("back")
    }
    

    
}