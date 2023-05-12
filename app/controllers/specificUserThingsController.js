let Item = require("../models/itemModel")
let Kanban = require("../models/kanbanModel")
let mongoose = require("mongoose")
class specificUserThingsController {
// Kanban
    async manageKanbans(req, res, next){
        let userStringedID = req.params.userStringedID
        let deletedKanbanCount = await Kanban.countDeleted()
        let allKanbanCount = await Kanban.count()
        Kanban.find({userStringedID})
            .then((allUsersKanbans) => {
                res.render("manage-kanbans.ejs", {allUsersKanbans, deletedKanbanCount, allKanbanCount})
            })
            .catch(err => console.log("there is some err while trying to get all user's kanbans in specificUserThingsController", err))
    }

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

    // Soft Delete Kanban Then Delete Items Inside That Kanban
    async softDeleteKanban(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let deletedKanban = await Kanban.delete({
            userStringedID,
            _id: new mongoose.Types.ObjectId(kanbanStringedID),
        })
        if (deletedKanban.modifiedCount === 1){
            Item.delete({
                userStringedID,
                kanbanStringedID
            })
                .then(deletedItems => {
                    if (deletedItems){
                        res.redirect(`/user/${userStringedID}/kanban/manage-kanbans`)
                    }
                })
        }
    }

// Kanban Bin
    async kanbanBin(req, res, next){
        let userStringedID = req.params.userStringedID
        let deletedKanbanCount = await Kanban.countDeleted({userStringedID})
        Kanban.findDeleted({userStringedID})
            .then(deletedKanbans => {
                res.render("bin.ejs", {deletedKanbans, deletedKanbanCount})
            })
    }

    // Delete Permanently Kanban Then Delete Items Inside That Kanban
    deleteKanbanPermanently(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID

        Kanban.findOneAndDelete({
            userStringedID,
            _id: new mongoose.Types.ObjectId(kanbanStringedID)
        })
        .then(deletedKanban => {
            // let deletedKanbanStringedID = deletedKanban._id.toString()
            // let deletedKanbanUserStringedID = deletedKanban.userStringedID
            res.redirect(`/user/${userStringedID}/deleted/kanban`)
            // Item.delete({
            //     kanbanStringedID: deletedKanbanStringedID,
            //     userStringedID: deletedKanbanUserStringedID
            // })
            //     .then(() => {
            //     })
        })
    }

    restoreKanban(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID

        Kanban.restore({
            userStringedID,
            _id: new mongoose.Types.ObjectId(kanbanStringedID)
        })
        .then(restoredKanban => {
            res.redirect(`/user/${userStringedID}/kanban/manage-kanbans`)
        })
    }


// Item
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

    async softDeleteItem(req, res, next){
        let userStringedID = req.params.userStringedID
        let kanbanStringedID = req.params.kanbanStringedID
        let itemStringedID = req.params.itemStringedID
        Item.delete({
            userStringedID,
            kanbanStringedID,
            _id: new mongoose.Types.ObjectId(itemStringedID)
        })
        .then(deletedItem => {
            res.redirect(`/user/${userStringedID}/kanban/${kanbanStringedID}`)
        })
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