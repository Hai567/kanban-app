let express = require("express")
let router = express.Router()
let authController = require("../app/controllers/authController")
let passport = require("passport")

router.get("/sign-in", authController.signIn)
router.get("/sign-up", authController.signUp)

router.post("/sign-in", passport.authenticate("local", {
    failureRedirect: "/auth/sign-in",
    failureFlash: "Wrong Credentials",
    successRedirect: "/",
}))
router.post("/sign-up", authController.addUser)

module.exports = router