let Item = require("../models/itemModel")
class siteController {

    index(req, res, next){
        let todoItems = []
        let inProgressItems = [] 
        let doneItems = []
        Item.find({})
            .then(items => {
                items.forEach((item) => {
                    switch (item.section) {
                        case "todo":
                            todoItems.push(item)
                            break;
                        case "inProgress":
                            inProgressItems.push(item)
                            break
                        case "done":
                            doneItems.push(item)
                            break
                        default:
                            break;
                    }
                })
                res.render("index.ejs", {todoItems, inProgressItems, doneItems})
            })
    }

}

module.exports = new siteController