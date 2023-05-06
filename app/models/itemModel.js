let mongoose = require("mongoose")
let Schema = mongoose.Schema

let itemSchema = Schema ({
    content: String,
    section: String,
    kanbanStringedID: String,
    userStringedID: String,
}, {timestamps: true})

module.exports = mongoose.model("Item", itemSchema)