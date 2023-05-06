let Item = require("../models/itemModel")

let createItem = function(content, res, section){
    Item.create({
        content, 
        section
    })
        .then(item => {
            if (item){
                res.redirect("/")
            }else{
                console.log("Can Not Create New Item")
            }
        })
        .catch(err => console.log("Error In addItemController", err))

}

class addItemController{

    // [POST] /item/add/todo
    todo(req, res, next){
        createItem(req.body.content, res, "todo")
    }

    // [POST] /item/add/in-process
    inProgress(req, res ,next){
        createItem(req.body.content, res, "inProgress")
    }

    // [POST] /item/add/done
    done(req, res, next){
        createItem(req.body.content, res, "done")
    }

}

module.exports = new addItemController