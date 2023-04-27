let siteRouter = require("./siteRouter")
let itemRouter = require("./itemRouter")

module.exports = function routesManager(app){
    app.use("/item", itemRouter)
    app.use("/", siteRouter)
}