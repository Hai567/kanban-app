let Item = require("../models/itemModel")
let Kanban = require("../models/kanbanModel")
let mongoose = require("mongoose")
class specificUserThingsController {

    getKanbanDetail(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let todoItems = []
        let inProgressItems = []
        let doneItems = []
        Item.find({
            userStringedID,
            kanbanStringedID
        })
            .then(items => {
                items.forEach((item) => {
                    switch (item.section) {
                        case "todo":
                            todoItems.push(item)
                            break;
                        case "inProgress":
                            inProgressItems.push(item)
                            break
                        case "done":
                            doneItems.push(item)
                            break
                        default:
                            break;
                    }
                })
                res.render("kanban-detail.ejs", {items, todoItems, inProgressItems, doneItems})
            })
    }

    addNewItemToKanban(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let content = req.body.content
        let section = req.params.section
        Item.create({
            userStringedID,
            kanbanStringedID,
            content,
            section
        })
            .then(item => {
                if (item){
                    res.redirect(`/user/${userStringedID}/kanban/${kanbanStringedID}`)
                }else{
                    console.log("Can Not Create New Item")
                }
            })
            .catch(err => console.log("Error In addItemController", err))
    }

    // [PATCH] /item/update/content/:itemStringedID
    updateItemContent(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let itemObjID =  new mongoose.Types.ObjectId(req.params.itemStringedID)
        Item.findOneAndUpdate({
                _id: itemObjID,
                userStringedID,
                kanbanStringedID
            },
            {content: req.body["updated-content"]}
            )
            .then(item => {
                if(item) {
                    res.redirect(`/user/${userStringedID}/kanban/${kanbanStringedID}`)
                }else{
                    console.log("Can Not Update Item")
                }
            })
            .catch(err => console.log("Error In updateItemController", err))
    }

    // [PATCH] /item/update/section/:itemStringedID
    updateItemSection(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let itemObjID =  new mongoose.Types.ObjectId(req.params.itemStringedID)
        Item.findOneAndUpdate({
                _id: itemObjID,
                userStringedID,
                kanbanStringedID
            },
            {section: req.body["updated-section"]}
            )
            .then(item => {
                if(item) {
                    res.redirect(`/user/${userStringedID}/kanban/${kanbanStringedID}`)
                }else{
                    console.log("Can Not Update Item")
                }
            })
            .catch(err => console.log("Error In updateItemController", err))
    }

}

module.exports = new specificUserThingsController