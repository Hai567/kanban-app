let express = require("express")
let router = express.Router()
let addItemController = require("../app/controllers/addItemController")
let updateItemController = require("../app/controllers/updateItemController")

// Add Item
// [POST] /item
router.post("/add/todo", addItemController.todo)
router.post("/add/in-process", addItemController.inProcess)
router.post("/add/done", addItemController.done)

// Update Item
// [PUT] /item
router.put("/update/:itemStringedID", updateItemController.updateItemContent)


module.exports = router