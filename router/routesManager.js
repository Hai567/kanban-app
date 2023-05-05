let siteRouter = require("./siteRouter")
let itemRouter = require("./itemRouter")
let authRouter = require("./authRouter")
let differentKanbanRouter = require("./kanbanDetailRouter")

module.exports = function routesManager(app){
    //
    app.use("/user", differentKanbanRouter)
    // Auth Router
    app.use("/auth", authRouter)
    //
    app.use("/item", itemRouter)
    //
    app.use("/", siteRouter)
}