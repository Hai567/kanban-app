let mongoose = require("mongoose")
let Schema = mongoose.Schema
let findThingsOrCreateThings = require("../plugins/findThingsOrCreateThings")

let userSchema = Schema({
    email: String,
    hashedPassword: String,
    avatar: String,
    userName: String,
    loginMethod: String,
    googleId: String,
    facebookId: String,
    loginType: String,
})

userSchema.plugin(findThingsOrCreateThings)

module.exports = mongoose.model("User", userSchema)