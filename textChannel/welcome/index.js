const fs = require("fs");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  ChannelType,
} = require("discord.js");
const botDataPath = __dirname + "/../../data/bot-data.json";

module.exports.run = async (guild) => {
  let data = JSON.parse(fs.readFileSync(botDataPath));
  const welcomeChannelId = data.guilds[guild.id].welcomeChannelId;
  if (welcomeChannelId) {
    const welcomeChannel = await guild.channels
      .fetch(welcomeChannelId)
      .catch((err) => {
        if (err.code != 10003) throw new Error(err);
      });
    if (welcomeChannel) return;
  }

  const channel = await guild.channels.create({
    name: "bienvenue",
    type: ChannelType.GuildText,
  });

  data.guilds[guild.id].welcomeChannelId = channel.id;
  fs.writeFileSync(botDataPath, JSON.stringify(data));

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("register")
      .setLabel("S'enregistrer")
      .setStyle(ButtonStyle.Primary)
  );
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
