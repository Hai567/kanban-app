let User = require("../models/userModel")
let bcrypt = require("bcrypt")
class authController {

    signIn(req, res, next){
        res.render("./auth/sign-in.ejs")
    }

    signUp(req, res, next){
        res.render("./auth/sign-up.ejs")
    }

    addUser(req, res, next){
        User.findOne({
            email: req.body.email
        })
            .then( async (user) => {
                if (user){
                    res.redirect("/auth/sign-up")
                }else{
                    let hashedPassword = await bcrypt.hash(req.body.password, 10)
                    User.create({
                        email: req.body.email,
                        userName: req.body.userName,
                        hashedPassword,
                    })
                    res.redirect("/auth/sign-in")
                }
            })
            .catch(err => console.log("Error In authController", err))
    }

    checkUser(req, res, next){
        console.log(req.body)
    }

}

module.exports = new authController