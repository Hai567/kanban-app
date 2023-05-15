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
let MongoStore = require('connect-mongo')
let flash = require("connect-flash")
let checkIfUserIsAuthenticatedThenReturnUserProfile = require("./app/middlewares/checkIfUserIsAuthenticatedThenReturnUserProfile")

// Connect Mongoose
let connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_ATLAS_URL, connectionParams)
    .then(console.log("Connected To Atlas"))
    .catch(err => console.log("Err encountered while connecting to Atlas"))

// Use Session
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_ATLAS_URL }),
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

// Custom Middlewares
app.use(checkIfUserIsAuthenticatedThenReturnUserProfile)

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