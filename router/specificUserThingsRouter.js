let express = require("express")
let router = express.Router()
let specificUserThingsController = require("../app/controllers/specificUserThingsController")

// Manage Kanbans
router.get("/:userStringedID/kanban/manage-kanbans", specificUserThingsController.manageKanbans)

// /user/:userStringedID/kanban/:kanbanStringedID
// Get Kanban Detail
router.get("/:userStringedID/kanban/:kanbanStringedID", specificUserThingsController.getKanbanDetail)

// Add Kanban
router.post("/:userStringedID/kanban/add", specificUserThingsController.addNewKanban)
// Update Kanban Name
router.patch("/:userStringedID/kanban/:kanbanStringedID/update/name", specificUserThingsController.updateKanbanName)
// Delete Kanban
router.delete("/:userStringedID/kanban/:kanbanStringedID/delete/soft", specificUserThingsController.softDeleteKanban)


// Add Item
router.post("/:userStringedID/kanban/:kanbanStringedID/item/add/:section", specificUserThingsController.addNewItemToKanban)

// Update Item
    // [PATCH] /item/update/content
router.patch("/:userStringedID/kanban/:kanbanStringedID/item/update/content/:itemStringedID", specificUserThingsController.updateItemContent)
    // [PATCH] /item/update/section
router.patch("/:userStringedID/kanban/:kanbanStringedID/item/update/section/:itemStringedID", specificUserThingsController.updateItemSection)

module.exports = router