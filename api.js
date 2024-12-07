const { response } = require("express")
const database = require("./db_m")

module.exports = function(pref, req, res){
   const data = req.body
   const guild = req.params.guild
   try {
    if (data.type == "preferences") {
      let currentprefs = data.pref
      currentprefs.array.forEach(element => {
        if (!database.valid_pref[element.name]){
            return res.status(500).json({"type": "invalid preference", "misc": element.name})
        }
      });
      
        if (currentprefs.color == "blue"){
          currentprefs.color = 0x00FFFF
        database.settings(pref, guild, currentprefs)
        return res.status(200).json({"type":"success"}).json({"type":"success"})
        } else if (currentprefs.color == "red"){
          currentprefs.color = 0xFF0000
        database.settings(pref, guild, currentprefs)
        return res.status(200).json({"type":"success"})
        } else if (currentprefs.color == "green"){
          currentprefs.color = 0x00FF00
        database.settings(pref, guild, currentprefs)
        return res.status(200).json({"type":"success"})
        } else if (currentprefs.color == "purple"){
          currentprefs.color = 0x800080
        database.settings(pref, guild, currentprefs)
        return res.status(200).json({"type":"success"})
        } else {
          currentprefs.color = 0x00FFFF
        database.settings(pref, guild, currentprefs)
      return res.status(200).json({"type":"success"})
        }
    }
   }catch(e){
    console.error(e)
    return res.status(500).json({"type": "error"})
   }
   
}