require("dotenv").config()
let express = require("express")
let app = express()
let PORT = process.env.PORT || 3000
let ejs = require("ejs")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
let methodOverride = require('method-override')
let session = require("express-session")
let passport = require("passport")
let flash = require("connect-flash")

// Connect Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/kanban-app")
// Use Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // milisec|sec|minute|hour // 1 day
    }
}))
app.use(flash())

// Use Passport
app.use(passport.initialize())
app.use(passport.session())

let routesManager = require("./router/routesManager")

// Use BodyParser
app.use(bodyParser.urlencoded({extended: true}))
// Override Method having ?_method=[DELETE/PUT/PATCH]
app.use(methodOverride("_method"))
// Set View Engine
app.set("view engine", "ejs")
// Use "Public" As Static Folder
app.use(express.static("public"))


routesManager(app)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})