let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let User = require("../../models/userModel")
let bcrypt = require("bcrypt")

module.exports = function initLocalStrategy(){
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    function (email, password, done) {
        User.findOne({email})
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.hashedPassword, function(err, found){
                        if (found){
                            return done(null, user)
                        }else{
                            return done(null, false)
                        }
                    })
                }else{
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
    }
    ))


    passport.serializeUser((user, done) => {
        return done(null, user)
    })
    passport.deserializeUser((user, done) => {
        User.findOne(user)
            .then(user => {
                if (user) {
                    return done(null, user)
                }else{
                    return done(null, false)
                }
            })
            .catch(err => console.log("Error In localStrategy", err))
    })
}