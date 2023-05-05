let Kanban = require("../models/kanbanModel")
let mongoose = require("mongoose")

let createItem = function(content, res, section, userStringedID, kanbanID){
    Kanban.findOneAndUpdate({
        userStringedID,
        _id: new mongoose.Types.ObjectId(kanbanID)
    }, {$push: {[section]: content}})
        .then(result => {
            if (result){
                res.redirect(`/user/${userStringedID}/kanban/${kanbanID}`)
            }else{
                console.log("Can not add new item")
            }
        })
}

class addItemController{

    // [POST] /item/add/todo/:kanbanID/:userStringedID
    todo(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanID = req.params.kanbanID
        createItem(req.body.content, res, "todo", userStringedID, kanbanID)
    }

    // [POST] /item/add/in-process/:kanbanID/:userStringedID
    inProgress(req, res ,next){
        let userStringedID = req.params.userStringedID
        let kanbanID = req.params.kanbanID
        createItem(req.body.content, res, "inProgress", userStringedID, kanbanID)
    }

    // [POST] /item/add/done/:kanbanID/:userStringedID
    done(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanID = req.params.kanbanID
        createItem(req.body.content, res, "done", userStringedID, kanbanID)
    }

}

module.exports = new addItemController