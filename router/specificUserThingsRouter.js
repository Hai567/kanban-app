let express = require("express")
let router = express.Router()
let specificUserThingsController = require("../app/controllers/specificUserThingsController")

router.get("/:userStringedID/kanban/:kanbanStringedID", specificUserThingsController.kanbanDetail)


module.exports = router