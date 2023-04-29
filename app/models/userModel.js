let mongoose = require("mongoose")
let Schema = mongoose.Schema

let userSchema = Schema({
    email: String,
    hashedPassword: String,
    avatar: String,
    userName: String
})

module.exports = mongoose.model("User", userSchema)