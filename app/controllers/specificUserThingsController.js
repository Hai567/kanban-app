let Item = require("../models/itemModel")
let Kanban = require("../models/kanbanModel")
let mongoose = require("mongoose")
class specificUserThingsController {

    async getKanbanDetail(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let todoItems = []
        let inProgressItems = []
        let doneItems = []
        let kanbanInfo = await Kanban.findOne({
            userStringedID,
            _id: new mongoose.Types.ObjectId(kanbanStringedID)
        })
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
                res.render("kanban-detail.ejs", {items, todoItems, inProgressItems, doneItems, kanbanInfo})
            })
    }

    addNewKanban(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanName = req.body.kanbanName
        Kanban.findThingsOrCreateThings({
            userStringedID,
            kanbanName
        })
        // Create New Item For The Kanban Right After Created That Kanban Because There Need Sth In The DB To Find Or Return null
            .then((newKanban) => {
                let kanbanStringedID = newKanban._id.toString()
                Item.create({
                    userStringedID,
                    kanbanStringedID
                })
                    .then(result => {
                        if(result){
                            res.redirect("/")
                        }else{
                            console.log("Can Not Create New Kanban")
                        }
                    })
                    .catch(err => console.log("There Is Some Err While Creating New Item Right After Created New Kanban in specificUserThingsController [create]", err))
            })
            .catch(err => console.log("There Is Some Err While Creating New Kanban specificUserThingsController [create]", err))
    }

    updateKanbanName(req, res, next){
        let updatedKanbanName = req.body["updated-kanban-name"]
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID

        Kanban.findOneAndUpdate({
            userStringedID,
            _id: new mongoose.Types.ObjectId(kanbanStringedID)
        },{kanbanName: updatedKanbanName})
            .then(kanban => {
                if (kanban){
                    res.redirect(`/user/${userStringedID}/kanban/${kanbanStringedID}`)
                }else{
                    console.log("Can Not Update Kanban Name")
                }
            })
            .catch(err => console.log("Some Err Occured While Updating Kanban Name In specificUserThingsController", err))
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