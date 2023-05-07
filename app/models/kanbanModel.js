let mongoose = require("mongoose")
let Schema = mongoose.Schema
let findThingsOrCreateThings = require("../plugins/findThingsOrCreateThings")
let mongooseDelete = require('mongoose-delete')

let kanbanSchema = Schema ({
    userStringedID: String,
    kanbanName: String
}, {timestamps: true})

kanbanSchema.plugin(findThingsOrCreateThings)
kanbanSchema.plugin(mongooseDelete, { 
    overrideMethods: true,
    deletedAt: true
})

module.exports = mongoose.model("Kanban", kanbanSchema)