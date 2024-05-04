const dashboardRouters = require("./dashboard.route")
const productsRouters = require("./products.route")
const productsCategoryRouters = require("./products-category.route")
const roleRouters = require("./role.route")
const accountRouters = require("./account.route")
const authRouters = require("./auth.route")
const recycleBinRouters = require("./recycle-bin.route")
const profileRouters = require("./profile.route")
const systemConfig = require("../../config/system")
const authMiddleware = require("../../middlewares/admin/auth.middleware")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + "/dashboard", authMiddleware.authRequire, dashboardRouters)
    app.use(PATH_ADMIN + "/products", authMiddleware.authRequire, productsRouters)
    app.use(PATH_ADMIN + "/products-category", authMiddleware.authRequire, productsCategoryRouters)
    app.use(PATH_ADMIN + "/roles", authMiddleware.authRequire, roleRouters)
    app.use(PATH_ADMIN + "/accounts", authMiddleware.authRequire, accountRouters)
    app.use(PATH_ADMIN + "/auth", authRouters)
    app.use(PATH_ADMIN + "/profile", authMiddleware.authRequire, profileRouters)
    app.use(PATH_ADMIN + "/recycle-bin", authMiddleware.authRequire, recycleBinRouters)
}