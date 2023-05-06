let Kanban = require("../models/kanbanModel")
class siteController {

    index(req, res, next){
        Kanban.find({})
            .then(result => {
                console.log(result)
                res.render("index.ejs")
            })
    }

}

module.exports = new siteController