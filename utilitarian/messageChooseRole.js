const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports.run = async (client, channelId, messageEmbed) => {
  const channel = await client.channels.fetch(channelId);
  if (!channel.send) return "Channel is not text";
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("getRoles").setLabel("Vos rôles").setStyle(ButtonStyle.Primary));

  await channel.send({ embeds: [messageEmbed], components: [row] });

  return;
};
