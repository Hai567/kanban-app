let mongoose = require("mongoose")
let Schema = mongoose.Schema

let KanbanSchema = Schema ({
    userStringedID: String,
    kanbanName: String
}, {timestamps: true})

module.exports = mongoose.model("Kanban", KanbanSchema)