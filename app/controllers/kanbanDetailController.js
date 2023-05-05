let Kanban = require("../models/kanbanModel")
let mongoose = require("mongoose")
class differentKanbanController {

    index(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanObjID = new mongoose.Types.ObjectId(req.params.kanbanID)
        Kanban.findOne({
            userStringedID,
            _id: kanbanObjID
        })
            .then(kanbanResult => {
                res.render("kanban-detail.ejs", {kanbanResult})
            })
    }

}

module.exports = new differentKanbanController