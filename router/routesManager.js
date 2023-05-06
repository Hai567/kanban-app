let siteRouter = require("./siteRouter")
let authRouter = require("./authRouter")
let specificUserThingsRouter = require("./specificUserThingsRouter")

module.exports = function routesManager(app){
    // Secific User Router (/user/:userStringedID)
    app.use("/user", specificUserThingsRouter)
    // Auth Router
    app.use("/auth", authRouter)
    //
    app.use("/", siteRouter)
}