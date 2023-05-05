let express = require("express")
let router = express.Router()
let addItemController = require("../app/controllers/addItemController")
let updateKanbanController = require("../app/controllers/updateKanbanController")

// Add Item
    // [POST] /item
router.post("/add/todo/:kanbanID/:userStringedID", addItemController.todo)
router.post("/add/in-progress/:kanbanID/:userStringedID", addItemController.inProgress)
router.post("/add/done/:kanbanID/:userStringedID", addItemController.done)

// Update Item
    // [PATCH] /item/update/content
router.patch("/update/content/:itemStringedID", updateKanbanController.updateItemContent)
    // [PATCH] /item/update/section
router.patch("/update/section/:itemStringedID", updateKanbanController.updateItemSection)


module.exports = router