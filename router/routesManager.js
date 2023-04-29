let siteRouter = require("./siteRouter")
let itemRouter = require("./itemRouter")
let authRouter = require("./authRouter")

module.exports = function routesManager(app){
    // Auth Router
    app.use("/auth", authRouter)
    //
    app.use("/item", itemRouter)
    //
    app.use("/", siteRouter)
}