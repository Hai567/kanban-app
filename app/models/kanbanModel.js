let mongoose = require("mongoose")
let Schema = mongoose.Schema

let KanbanSchema = Schema ({
    userStringedID: String,
    todo: [String],
    inProgress: [String],
    done: [String],
    number: Number,
    kanbanName: String
})

module.exports = mongoose.model("Kanban", KanbanSchema)