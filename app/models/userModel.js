let mongoose = require("mongoose")
let Schema = mongoose.Schema
let findThingsOrCreateThings = require("../plugins/findThingsOrCreateThings")

let userSchema = Schema({
    _id: {
        type: String,
        default: new mongoose.Types.ObjectId
    },
    email: String,
    hashedPassword: String,
    avatar: String,
    userName: String,
    loginMethod: String,
    googleId: String,
    facebookId: String,
})

userSchema.plugin(findThingsOrCreateThings)

module.exports = mongoose.model("User", userSchema)