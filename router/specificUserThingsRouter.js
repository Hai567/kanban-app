let express = require("express")
let router = express.Router()
let specificUserThingsController = require("../app/controllers/specificUserThingsController")

// /user/:userStringedID/kanban/:kanbanStringedID
router.get("/:userStringedID/kanban/:kanbanStringedID", specificUserThingsController.getKanbanDetail)

// Add Item
router.post("/:userStringedID/kanban/:kanbanStringedID/item/add/:section", specificUserThingsController.addNewItemToKanban)

// Update Item
    // [PATCH] /item/update/content
router.patch("/:userStringedID/kanban/:kanbanStringedID/item/update/content/:itemStringedID", specificUserThingsController.updateItemContent)
    // [PATCH] /item/update/section
router.patch("/:userStringedID/kanban/:kanbanStringedID/item/update/section/:itemStringedID", specificUserThingsController.updateItemSection)

module.exports = router