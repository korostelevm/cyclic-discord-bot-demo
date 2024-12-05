
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()

const { request } = require('undici');
const pastelgate = require('./pastelgate')
const pref_web = require('./api')
const cool = require('./db_m')
const { APPLICATION_ID, TOKEN, PUBLIC_KEY } = process.env
const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const interactions = require('discord-interactions')

const app = express();
// app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser())
app.use('/static', express.static('./public/static'));
app.set('view engine', 'ejs');
app.set('views', "./public")
const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Authorization",
    "Authorization": `Bot ${TOKEN}`
  }
});
app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body
  if (interaction.type === InteractionType.BUTTON_CLICK) {
    if (interaction.data.custom_id == 'form_button') {
      const title = interaction.data.fname || 'Form'; // Set default title if missing
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "WIP feature"
        }
      })
    }
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    // console.log(interaction.data.name)
    if (interaction.data.name == 'yo') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Yo!"
        }
      });
    }
  }

  // get an item at key "leo" from collection animals
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "WIP"
    }
  });


if (interaction.data.name === 'forms') {
  if (interaction.data.options && interaction.data.options.length > 0) {
    const formName = interaction.data.options[0].value;

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "A form has appeared",
        tts: false,
        fname: formName,
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "Open " + formName,
                style: 1,
                custom_id: "form_button",
              }
            ]
          }
        ]
      }
    });
  } else {
    console.log("nothing")
  }
} if (interaction.data.name == 'game') {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      "content": "W.I.P",
      "tts": false
    }
  })
}
if (interaction.data.name == 'help') {
  const color = 0x00FFFF
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      "content": "",
      "tts": false,
      "embeds": [
        {
          "type": "rich",
          "title": `? kakll Help (0.1.5 (Beta) Game Update) ?`,
          "description": `<b>akll bot comands and programs</b>`,
          "color": color,
          "fields": [
            {
              "name": `/game`,
              "value": ` - Play a game`,
              "inline": true
            },
            {
              "name": `/dm`,
              "value": ` - Sends you a DM`,
              "inline": true
            },
            {
              "name": `/yo`,
              "value": ` - Store your secret note`,
              "inline": true
            }, {
              "name": `/bobux`,
              "value": ` - No Context`,
              "inline": true
            }, {
              "name": `/forms`,
              "value": ` - W.I.P`,
              "inline": true
            }
          ],
          "footer": {
            "text": `akll bot is made by syntax7311`
          }
        }
      ]
    },
  });
}
/* if(interaction.data.name == 'note'){
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
"content": interaction.member.user.name
}
})
} */
if (interaction.data.name == 'bobux') {
  amount = ["50", "100", "250", "500", "1000"];

  function whosPaying(amount) {
    let upperBound = names.length;
    let PersonBuyingLunch = Math.floor(Math.random() * upperBound)
    return names[PersonBuyingLunch]
  }
  /* let item = await robux.get(interaction.member.user.id) ?? 0
   let hey = whosPaying(amount)
   let result = item + hey
   let leo = await robux.set(interaction.member.user.id, {
bobux: result
})

// get an item at key "leo" from collection animals
item = await robux.get(interaction.member.user.id)*/
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: amount[Math.floor(Math.random() * (5 - 1) + 1)]
    }
  })
}
/*if(interaction.data.name == 'dm'){
  // https://discord.com/developers/docs/resources/user#create-dm
  let c = (await discord_api.post(`/users/@me/channels`,{
    recipient_id: interaction.member.user.id
  })).data
  try{
    // https://discord.com/developers/docs/resources/channel#create-message
    let res = await discord_api.post(`/channels/${c.id}/messages`,{
      content:'Yo! I got your slash command. I am not able to respond to DMs just slash commands.',
    })
    console.log(res.data)
  }catch(e){
    console.log(e)
  }
  if(interaction.data.name == 'dmo'){
    let c = (await discord_api.post(`/users/@me/channels`,{
    recipient_id: 716484322290565170
  })).data
  try{
    // https://discord.com/developers/docs/resources/channel#create-message
    let res = await discord_api.post(`/channels/${c.id}/messages`,{
      content:'DM',
    })
    console.log(res.data)
  }catch(e){
    console.log(e)
  }
  }

  return res.send({
    // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data:{
      content:'👍'
    }
  });
}*/})




app.get('/register_commands', async (req, res) => {
  let slash_commands = [
    {
      "name": "yo",
      "description": "replies with Yo!",

      "options": [{
        "name": "paste",
        "description": "store a text in this bot",
        "type": 3,
        "required": true,

      }
      ]
    },
    {
      "name": "game",
      "description": "play a game",
      "options": [
        {
          "name": "game",
          "description": "play a game",
          "type": 3,
          "required": true,
          "choices": [
            {
              "name": "Scissors Paper Rock",
              "value": "spr_game"
            }
          ]
        }
      ]
    },
    {
      "name": "dm",
      "description": "sends user a DM",
      "options": []
    },
    {
      "name": "dmo",
      "description": "sends user a DM",
      "options": []
    }, {
      "name": "help",
      "description": "comands",
      "options": []
    }, {
      "name": "bobux",
      "description": "earn bobux",
      "options": []
    }, {
      "name": "forms",
      "description": "creates a form for people to use",
      "options": [
        {
          "type": 3,
          "name": "fname",
          "description": "name of the form",
          "required": true
        }
      ]
    }
    /*{
      "name": "settings",
      "description": "OWNER ONLY",
      "options": [
        {
            "name": "type",
            "description": "Type of settings",
            "type": 3,
            "required": true,
        }
      ]
    } */
  ]
  try {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/commands`,
      slash_commands
    )
    console.log(discord_response.data)
    return res.send('commands have been registered')
  } catch (e) {
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})


app.get('/', async (req, res) => {
  console.log(req.cookies)
  if (req.cookies.access_key) {
    try {
      const userResult = await request('https://discord.com/api/users/@me', {
        headers: {
          authorization: `Bearer ${req.cookies.access_key}`,
        },
      });
      const e2 = await userResult.body.json()
      /* const servers = await request("https://discord.com/api/v6/users/@me/guilds", {
         headers: {
             authorization: "Bot " + process.env.TOKEN
         }
     })
     const e3 = await servers.body.json()
     e3.array.forEach(element => {
       
     }); */
      return res.render('index', {
        username: e2.global_name,
        avatar: e2.avatar
      })
    } catch (e) {
      console.error(e)
      return res.sendFile('/login.html', { 'root': "./public" });
    }


  } else {
    return res.sendFile('/login.html', { 'root': "./public" });
  }

})
app.get('/gates', async ({ query }, res) => {
  const { code } = query;

  if (code) {
    try {
      const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.APPLICATION_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: `https://aklll.cyclic.app/gates`,
          scope: 'identify',
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const oauthData = await tokenResponseData.body.json();
      console.log(oauthData);
      const userResult = await request('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      const e2 = await userResult.body.json()
      console.log(e2)
      return res.render("confirmation", {
        "username": e2.global_name,
        "key": oauthData.access_token
      })
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      console.error(error);
    }
  }


})
app.get("/etask/panel", (req, res) => { require('./admin').ui(req, res) })
app.post("/etask/api", express.json(), (req, res) => { require('./admin').api(req, res) })
//app.post("/api/guilds/:guild", express.json(), (req, res) => { pref_web(pref, req, res) })

app.listen(8999, () => {

})

