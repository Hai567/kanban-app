let express = require("express")
let router = express.Router()
let siteController = require("../app/controllers/siteController")

router.get("/", siteController.index)

module.exports = router