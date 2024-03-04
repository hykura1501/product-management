const dashboardRouters = require("./dashboard.route")
const productsRouters = require("./products.route")
const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN, dashboardRouters)
    app.use(PATH_ADMIN, productsRouters)
}