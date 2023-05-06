let Kanban = require("../models/kanbanModel")
class siteController {

    index(req, res, next){
        Kanban.find({})
            .then(kanbans => {
                res.render("index.ejs", {kanbans})
            })
    }

}

module.exports = new siteController