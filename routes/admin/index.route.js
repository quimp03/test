const dashboardRoutes = require("./dashboard.route")
const productsRoutes = require("./products.route")
const systemConfig = require("../../config/system")
const productsCategoryRoutes = require("./products-category.route")
const roles = require("./roles.route")
const accounts = require("./account.route")
module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
   app.use(PATH_ADMIN + "/dashboard", dashboardRoutes)
   app.use(PATH_ADMIN + "/products",  productsRoutes)
   app.use(PATH_ADMIN + "/products-category", productsCategoryRoutes)
   app.use(PATH_ADMIN + "/roles", roles)
   app.use(PATH_ADMIN + "/accounts", accounts)
}
