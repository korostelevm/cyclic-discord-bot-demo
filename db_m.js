module.exports = {
    valid_pref: [
        "color",
        "timezone"
    ],
    settings: async function (object, userid, json) {
      await object.set(userid, json)
    },
    bar: function () {
      // whatever
    }
  };