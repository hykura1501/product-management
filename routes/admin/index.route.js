const dashboardRouters = require("./dashboard.route")
const productsRouters = require("./products.route")
const productsCategoryRouters = require("./products-category.route")
const roleRouters = require("./role.route")
const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN, dashboardRouters)
    app.use(PATH_ADMIN, productsRouters)
    app.use(PATH_ADMIN, productsCategoryRouters)
    app.use(PATH_ADMIN, roleRouters)
}