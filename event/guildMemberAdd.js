const fs = require("fs");

module.exports.run = (client) => {
  client.on("guildMemberAdd", async (member) => {
    let data = JSON.parse(fs.readFileSync(__dirname + "/../data/bot-data.json"));

    member.user.send(
      `Bienvenue sur le serveur \`${
        member.guild.name
      }\`\nPour accéder entièrement au serveur, enregistres toi dans le channel <@&${
        data.guilds[member.guild.id].welcomeChannelId
      }>`
    );
  });
};
