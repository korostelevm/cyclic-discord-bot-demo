const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");

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
            await interaction.reply({content:"W.I.P"})
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName("yo")
            .setDescription("Yo!"),
        execute: async function(interaction){
            await interaction.reply({content:"Yo!"})
        }
    },
    {
        data: new SlashCommandBuilder()
            .setName("forms")
            .setDescription("Create a form"),
        execute: async function (interaction) {
            const embed = new EmbedBuilder()
                .setTitle("A form has appeared")
                .setDescription(interaction.data.options[0].value)
            const button = new ButtonBuilder()
                .setCustomId('button-')
			    .setLabel('Open ' + interaction.data.options[0].value)
			    .setStyle(ButtonStyle.Primary);
            await interaction.reply({embeds:[embed,button]})
        }
    }
] 