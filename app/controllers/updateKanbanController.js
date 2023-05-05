let Kanban = require("../models/kanbanModel")
let mongoose = require("mongoose")
class updateItemController {

    // [PATCH] /item/update/content/:itemStringedID
    updateItemContent(req, res, next){
        let kanbanID
        Kanban.findOne({kanbanID})
            .then(kanban => {
                let itemContentIndex = kanban.section.indexOf("itemContent")
                kanban.section[itemContentIndex] = "newContent"
                kanban.save()
            })
    }

    // [PATCH] /item/update/section/:itemStringedID
    updateItemSection(req, res, next){
        Kanban.findOneAndUpdate(
            {_id: req.params.itemStringedID},
            {section: req.body["updated-section"]}
            )
            .then(item => {
                if(item) {
                    res.redirect("/")
                }else{
                    console.log("Can Not Update Item")
                }
            })
            .catch(err => console.log("Error In updateItemController", err))
    }

}

module.exports = new updateItemController