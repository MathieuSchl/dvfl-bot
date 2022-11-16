const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ChannelType } = require("discord.js");

module.exports.run = async (guild) => {
  const channel = await guild.channels.create({
    name: "bienvenue",
    type: ChannelType.GuildText,
  });

  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("register").setLabel("S'enregistrer").setStyle(ButtonStyle.Primary));
  await channel.send({
    embeds: [
      {
        color: 0xed4245,
        title: "Serveur du DeVinci FabLab",
        description: "Bienvenue sur le serveur discord du DeVinci FabLab",
      },
    ],
    components: [row],
  });
};
