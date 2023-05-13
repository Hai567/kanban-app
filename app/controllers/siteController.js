let Kanban = require("../models/kanbanModel")
class siteController {

    index(req, res, next){
        if (req.isAuthenticated()){
            let user = req.user
            Kanban.find({
                userStringedID: user._id.toString()
            })
                .then(kanbans => {
                    res.render("index.ejs", {kanbans})
                })
        }else{
            res.redirect("/auth/sign-in")
        }

    }

}

module.exports = new siteController