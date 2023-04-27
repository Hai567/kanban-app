let mongoose = require("mongoose")
let Schema = mongoose.Schema

let ItemSchema = Schema ({
    content: String,
    section: String,
})

module.exports = mongoose.model("Item", ItemSchema)