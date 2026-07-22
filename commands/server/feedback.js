const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	PermissionFlagsBits,
	bold,
	MessageFlags,
} = require("discord.js");

module.exports = {
	cooldown: 60,
	category: "server",
	data: new SlashCommandBuilder()
		.setName("feedback")
		.setDescription("Feedback related commands")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("setup")
				.setDescription("Setup feedback embed and buttons"),
		),
	async execute(interaction) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const embed = new EmbedBuilder()
			.setTitle("Feedback")
			.setColor("White")
			.setDescription(
				bold("Let us know your thoughts!") +
					"\nChoose a issue type to sent a message to the Crownstone Survival development team.",
			)
			.addFields(
				{
					name: "Bug Report",
					value:
						"Report to us if something does not work properly in the game.",
					inline: false,
				},
				{
					name: "Suggestion",
					value: "Share your thoughts about how we can improve the game.",
					inline: false,
				},
				{
					name: "Translation Issue",
					value:
						"Let us know if you have found any ingame text which does not make sense.",
					inline: false,
				},
			)
			.setFooter({
				text: "Crownstone Survival",
				iconURL: "https://i.ibb.co/zT7z1Bn2/image.png",
			});

		const bugReportButton = new ButtonBuilder()
			.setLabel("Bug Report")
			.setStyle(ButtonStyle.Danger)
			.setCustomId("bugReport")
			.setEmoji("🐛");

		const suggestionButton = new ButtonBuilder()
			.setLabel("Suggestion")
			.setStyle(ButtonStyle.Success)
			.setCustomId("suggestion")
			.setEmoji("💡");

		const translationIssueButton = new ButtonBuilder()
			.setLabel("Translation Issue")
			.setStyle(ButtonStyle.Primary)
			.setCustomId("translationIssue")
			.setEmoji("🔤");

		const row = new ActionRowBuilder().addComponents(
			bugReportButton,
			suggestionButton,
			translationIssueButton,
		);

		await interaction.channel.send({ embeds: [embed], components: [row] });

		await interaction.editReply({ content: "Feedback setup complete!" });
	},
};
