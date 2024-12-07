require('dotenv').config()

const { request } = require('undici');
const pastelgate = require('./pastelgate')
const pref_web = require('./api')
const cool = require('./db_m')
const axios = require('axios')
const commands = require('./commands.js')
const express = require('express');

const app = express();
// app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser())
app.use('/static', express.static('./public/static'));
app.set('view engine', 'ejs');
app.set('views', "./public")
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { APPLICATION_ID, TOKEN, PUBLIC_KEY } = process.env


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.commands = new Collection()

for (I in commands){
  const command = commands[I]
  client.commands.set(command.name, command.execute)
}
const rest = new REST().setToken(TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(APPLICATION_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
// Log in to Discord with your client's token
app.listen(8999)
client.login(TOKEN);