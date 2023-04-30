let express = require("express")
let router = express.Router()
let addItemController = require("../app/controllers/addItemController")
let updateItemController = require("../app/controllers/updateItemController")

// Add Item
    // [POST] /item
router.post("/add/todo", addItemController.todo)
router.post("/add/in-progress", addItemController.inProgress)
router.post("/add/done", addItemController.done)

// Update Item
    // [PATCH] /item/update/content
router.patch("/update/content/:itemStringedID", updateItemController.updateItemContent)
    // [PATCH] /item/update/section
router.patch("/update/section/:itemStringedID", updateItemController.updateItemSection)


module.exports = router