let siteRouter = require("./siteRouter")
let itemRouter = require("./itemRouter")
let authRouter = require("./authRouter")
let specificUserThingsRouter = require("./specificUserThingsRouter")

module.exports = function routesManager(app){
    // Secific User Router (/user/:userStringedID)
    app.use("/user", specificUserThingsRouter)
    // Auth Router
    app.use("/auth", authRouter)
    //
    app.use("/item", itemRouter)
    //
    app.use("/", siteRouter)
}