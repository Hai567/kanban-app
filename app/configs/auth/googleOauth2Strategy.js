let passport = require("passport")
let GoogleStrategy = require("passport-google-oauth20").Strategy
let User = require("../../models/userModel")
let findThingsOrCreateThings = require("../../plugins/findThingsOrCreateThings")

module.exports = function initGoogleOauth(param) {  
    let GoogleStrategy = require("passport-google-oauth20").Strategy

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email", "openid"]
    },
    function(accessToken, refreshToken, profile, cb) {
        let JSONedProfile = profile._json
        User.findThingsOrCreateThings({
            googleId: profile.id, 
            loginMethod: "Google"}, {
            userName: JSONedProfile.name,
            avatar: JSONedProfile.picture,
            googleId: profile.id, 
            email: JSONedProfile.email,
            loginMethod: "Google"
            }, function (err, user) {  
                return cb(err, user)
            })
    }
    ))

    passport.serializeUser((user, done) => {
        return done(null, user)
    })
    passport.deserializeUser((user, done) => {
        User.findOne({googleId: user.googleId})
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