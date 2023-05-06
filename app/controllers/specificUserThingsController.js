class specificUserThingsController {

    kanbanDetail(req, res, next){
        res.render("kanban-detail.ejs")
    }

}

module.exports = new specificUserThingsController