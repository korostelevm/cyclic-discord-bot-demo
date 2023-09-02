const { response } = require("express")

module.exports = function(db, req,res){
   const data = req.body
   try {
    if (data.type == "preferences") {
      let currentprefs = data.pref
      res.status(204)
    }
   } catch(e){
    console.error(e)
    res.status(500).json({"type": "error"})
   }
   
}