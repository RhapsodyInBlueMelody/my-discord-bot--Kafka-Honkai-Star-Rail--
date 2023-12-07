const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Check me~"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `Mommy lihat..\nAPI Latency kamu: ${
      client.ws.ping
    }\ndan Client ping kamu: ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;

    await interaction.editReply({
      content: newMessage,
    });
  },
};
