const { InteractionResponseType } = require('discord-interactions');
module.exports = {
	name: "fun_ping",
	description: "This is a Fun Ping Message.",
	options: [],
	async execute(interaction, res) {
		res.send({
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				content: `Yo ${interaction.member.user.username}!`,
			},
		});
		return res.send({
			type: InteractionResponseType.UPDATE_MESSAGE,
			data: {
				content: "Neverind."
			}
		})
	}
}