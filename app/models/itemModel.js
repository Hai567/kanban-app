let mongoose = require("mongoose")
let Schema = mongoose.Schema

let ItemSchema = Schema ({
    content: String,
    section: String,
    kanbanStringedID: String
}, {timestamps: true})

module.exports = mongoose.model("Item", ItemSchema)