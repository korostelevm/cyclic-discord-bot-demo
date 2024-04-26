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
      switch (currentprefs.color){
      case 'blue':
        currentprefs.color = 0x00FFFF
        break;
      case 'red':
        currentprefs.color = 0xFF0000
        break;
      case 'green':
        currentprefs.color = 0x00FF00
        break;
      case 'purple':
        currentprefs.color = 0x800080
        break;
      default: 
        currentprefs.color = 0x00FFFF
      }
      database.settings(pref, guild, currentprefs)
      return res.status(204)
    }
   }catch(e){
    console.error(e)
    return res.status(500).json({"type": "error"})
   }
   
}