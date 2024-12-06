const { SlashCommandBuilder } = require("discord.js");

module.exports = [
    {
        data: new SlashCommandBuilder()
           .setName("help")
           .setDescription("all commands"),
        execute: async function(interaction){
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x00FFFF)
            .setTitle('? kakll Help (0.1.5 (Beta) Game Update) ?')
            .setURL('https://starter-discord-bot-73vg.onrender.com/')
            .setDescription('Commands and features for kaklll')
            .addFields(
                { name: '/game', value: 'Play a game (WIP)' },
                { name: '/help', value: 'Help and commands' },
                { name: '/bobux', value: 'Bobux generator real' },
                { name: '/yo', value: 'Yo!' },
                { name: '/forms', value: 'Generate a form (WIP)' },
            )
            .setTimestamp()
            .setFooter({ text: 'kakll bot made by syntax7311' });
        
            await interaction.reply({ embeds: [exampleEmbed] });
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName("game")
            .setDescription("play a game"),
        execute: async function(interaction){
            await interaction.reply("W.I.P")
        }
    }
] 