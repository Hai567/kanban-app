let mongoose = require("mongoose")
let Schema = mongoose.Schema
let mongooseDelete = require('mongoose-delete')

let itemSchema = Schema ({
    content: String,
    section: String,
    kanbanStringedID: String,
    userStringedID: String,
}, {timestamps: true})

itemSchema.plugin(mongooseDelete)
itemSchema.plugin(mongooseDelete, { 
    overrideMethods: true,
    deletedAt: true
})

module.exports = mongoose.model("Item", itemSchema)