const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb("charming-jade-dholeCyclicDB")
const key = process.env.ADMIN_API_KEY
var notes = db.collection("notes")
module.exports.ui = function(req,res) {
 res.render("admin", {
    "key": key
 })
}
module.exports.api = function(req,res) {
    commands = [
       "message"
    ]
    if (commands.includes(req.body.command) && req.body.value){
        if (req.body.command == "message"){
           notes.set("0",{
             "message": req.body.value
           })   
        }
         res.json({"success": "Feature WIP"})
    } else {
        res.json({"error": "Invalid Command"})
    }
}