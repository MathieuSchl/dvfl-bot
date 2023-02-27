const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, channelId, messageEmbed) => {
  const channel = await client.channels.fetch(channelId);
  const guild = channel.guild;
  if (!channel.send) return "Channel is not text";
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("register").setLabel("S'enregister").setStyle(ButtonStyle.Primary)
  );

  const message = await channel.send({ embeds: [messageEmbed], components: [row] });

  const data = JSON.parse(fs.readFileSync(__dirname + "/../data/bot-data.json"));
  if (!data.guilds) data.guilds = {};
  if (!data.guilds[guild.id]) data.guilds[guild.id] = {};
  if (!data.guilds[guild.id].messages) data.guilds[guild.id].messages = {};
  if (!data.guilds[guild.id].messages[message.id]) data.guilds[guild.id].messages[message.id] = {};
  if (!data.guilds[guild.id].messages[message.id].button) data.guilds[guild.id].messages[message.id].button = {};
  if (!data.guilds[guild.id].messages[message.id].button.addRole)
    data.guilds[guild.id].messages[message.id].button.addRole = [];
  fs.writeFileSync(__dirname + "/../data/bot-data.json", JSON.stringify(data));

  return;
};
