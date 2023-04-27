let Item = require("../models/itemModel")
let mongoose = require("mongoose")
class updateItemController {

    // [PUT] /item/update/:itemStringedID
    updateItemContent(req, res, next){
        Item.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(req.params.itemStringedID)},
            {content: req.body["updated-content"]}
            )
            .then(item => {
                if(item) {
                    res.redirect("/")
                }else{
                    console.log("Can Not Update Item")
                }
            })
            .catch(err => console.log("Error In updateItemController", err))
    }

}

module.exports = new updateItemController