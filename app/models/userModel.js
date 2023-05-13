let mongoose = require("mongoose")
let Schema = mongoose.Schema
let findThingsOrCreateThings = require("../plugins/findThingsOrCreateThings")

let userSchema = Schema({
    email: String,
    hashedPassword: String,
    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    },
    userName: String,
    loginMethod: String,
    googleId: String,
    facebookId: String,
    loginType: String,
}, {timestamps: true})

userSchema.plugin(findThingsOrCreateThings)

module.exports = mongoose.model("User", userSchema)