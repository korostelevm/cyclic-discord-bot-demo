import os
import requests
from flask import Flask, request, jsonify
from discord_interactions import verify_key_decorator, InteractionType, InteractionResponseType

APPLICATION_ID = os.getenv('APPLICATION_ID')
TOKEN = os.getenv('TOKEN')
PUBLIC_KEY = os.getenv('PUBLIC_KEY', 'not set')
GUILD_ID = os.getenv('GUILD_ID')

discord_api = requests.Session()
discord_api.headers.update({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Authorization",
    "Authorization": f"Bot {TOKEN}"
})

app = Flask(__name__)

@app.route('/interactions', methods=['POST'])
@verify_key_decorator(PUBLIC_KEY)
def interactions():
    interaction = request.json
    
    if interaction["type"] == InteractionType.APPLICATION_COMMAND:
        if interaction["data"]["name"] == "yo":
            return jsonify({
                "type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                "data": {"content": f"Yo {interaction['member']['user']['username']}!"}
            })
        
        if interaction["data"]["name"] == "dm":
            c = discord_api.post("https://discord.com/api/users/@me/channels", json={
                "recipient_id": interaction["member"]["user"]["id"]
            }).json()
            
            try:
                discord_api.post(f"https://discord.com/api/channels/{c['id']}/messages", json={
                    "content": "Yo! I got your slash command. I am not able to respond to DMs just slash commands."
                })
            except Exception as e:
                print(e)
            
            return jsonify({
                "type": InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                "data": {"content": "👍"}
            })

@app.route('/register_commands', methods=['GET'])
def register_commands():
    slash_commands = [
        {"name": "yo", "description": "replies with Yo!", "options": []},
        {"name": "dm", "description": "sends user a DM", "options": []}
    ]
    try:
        discord_response = discord_api.put(
            f"https://discord.com/api/applications/{APPLICATION_ID}/guilds/{GUILD_ID}/commands",
            json=slash_commands
        )
        return "commands have been registered"
    except requests.exceptions.RequestException as e:
        return f"{e.response.status_code} error from discord"

@app.route('/', methods=['GET'])
def home():
    return "Follow documentation"

if __name__ == '__main__':
    app.run(port=8999)
