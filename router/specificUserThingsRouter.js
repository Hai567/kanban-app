let express = require("express")
let router = express.Router()
let specificUserThingsController = require("../app/controllers/specificUserThingsController")

// Manage Kanbans
router.get("/:userStringedID/kanban/manage-kanbans", specificUserThingsController.manageKanbans)

// /user/:userStringedID/kanban/:kanbanStringedID
// Kanban
    // Get Kanban Detail
router.get("/:userStringedID/kanban/:kanbanStringedID", specificUserThingsController.getKanbanDetail)
    // Add Kanban
router.post("/:userStringedID/kanban/add", specificUserThingsController.addNewKanban)
    // Update Kanban Name
router.patch("/:userStringedID/kanban/:kanbanStringedID/update/name", specificUserThingsController.updateKanbanName)
    // Soft Delete Kanban
router.delete("/:userStringedID/kanban/:kanbanStringedID/delete/soft", specificUserThingsController.softDeleteKanban)
    // Restore Deleted Kanban
router.put("/:userStringedID/kanban/:kanbanStringedID/restore", specificUserThingsController.restoreKanban)


// Kanban Bin
    // Get Bin
    router.get("/:userStringedID/deleted/kanban", specificUserThingsController.kanbanBin)
    // Delete Kanban Permanently
    router.delete("/:userStringedID/kanban/:kanbanStringedID/delete/permanent", specificUserThingsController.deleteKanbanPermanently)
    // Restore Kanban


// Item
    // Add Item
router.post("/:userStringedID/kanban/:kanbanStringedID/item/add/:section", specificUserThingsController.addNewItemToKanban)

    // Update Item
        // [PATCH] /item/update/content
router.patch("/:userStringedID/kanban/:kanbanStringedID/item/update/content/:itemStringedID", specificUserThingsController.updateItemContent)
        // [PATCH] /item/update/section
router.patch("/:userStringedID/kanban/:kanbanStringedID/item/update/section/:itemStringedID", specificUserThingsController.updateItemSection)

    // Soft Delete Item
router.delete("/:userStringedID/kanban/:kanbanStringedID/item/:itemStringedID/delete/soft", specificUserThingsController.softDeleteItem)

    // Restore 

module.exports = router