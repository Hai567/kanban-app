let Kanban = require("../models/kanbanModel")
class siteController {
    async index(req, res, next){
        let userKanbans = await Kanban.find({userStringedID: "abc"})
        let todoItems = []
        let inProgressItems = [] 
        let doneItems = []
        Kanban.find({})
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
                res.render("index.ejs", {todoItems, inProgressItems, doneItems, userKanbans})
            })
    }

}

module.exports = new siteController