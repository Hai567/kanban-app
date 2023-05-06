let mongoose = require("mongoose")
let Schema = mongoose.Schema
let findThingsOrCreateThings = require("../plugins/findThingsOrCreateThings")

let kanbanSchema = Schema ({
    userStringedID: String,
    kanbanName: String
}, {timestamps: true})

kanbanSchema.plugin(findThingsOrCreateThings)

module.exports = mongoose.model("Kanban", kanbanSchema)