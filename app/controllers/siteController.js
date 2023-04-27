let Item = require("../models/itemModel")
class siteController {

    index(req, res, next){
        let todoItems = []
        let inProcessItems = [] 
        let doneItems = []
        Item.find({})
            .then(items => {
                items.forEach((item) => {
                    switch (item.section) {
                        case "todo":
                            todoItems.push(item)
                            break;
                        case "inProcess":
                            inProcessItems.push(item)
                            break
                        case "done":
                            doneItems.push(item)
                            break
                        default:
                            break;
                    }
                })
                res.render("index.ejs", {todoItems, inProcessItems, doneItems})
            })
    }

}

module.exports = new siteController