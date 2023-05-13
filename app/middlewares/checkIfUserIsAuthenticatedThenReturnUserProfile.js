// This middleware gonna check if user is authenticated, if not, return null, if yes, return user profile
module.exports = function checkIfUserIsAuthenticatedThenReturnUserProfile(req, res, next){
    res.locals.userProfile = null
    if (req.isAuthenticated()){
        res.locals.userProfile = req.user
    }
    next()
}