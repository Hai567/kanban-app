let express = require("express")
let router = express.Router()
let differentKanbanController = require("../app/controllers/kanbanDetailController")

// [GET] /user/:userStringed/kanban/:kanbanID
router.get("/:userStringedID/kanban/:kanbanID", differentKanbanController.index)


module.exports = router