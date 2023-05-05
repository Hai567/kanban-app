let express = require("express")
let router = express.Router()
let authController = require("../app/controllers/authController")
let passport = require("passport")

let initGoogleOauth = require("../app/configs/auth/googleOauth2Strategy")
let initLocalStrategy = require("../app/configs/auth/localStrategy")

// init Authentication Strategies
initLocalStrategy()
initGoogleOauth()

router.get("/sign-in", authController.signIn)
router.get("/sign-up", authController.signUp)

router.post("/sign-in", passport.authenticate("local", {
    failureRedirect: "/auth/sign-in",
    failureFlash: "Wrong Credentials",
    successRedirect: "/",
}))
router.post("/sign-up", authController.addUser)

// Google Oauth
router.get("/google/callback", passport.authenticate("google", { 
    failureRedirect: "/auth/login",
    successRedirect: "/"
}))

router.get("/google", passport.authenticate("google", {
   scope: ["profile", "email", "openid"] 
}))

module.exports = router