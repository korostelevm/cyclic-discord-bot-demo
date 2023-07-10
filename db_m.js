module.exports = {
    valid_pref: [
        "color",
        "timezone"
    ],
    settings: function (object, userid, json) {
      object.set(userid, json)
    },
    bar: function () {
      // whatever
    }
  };