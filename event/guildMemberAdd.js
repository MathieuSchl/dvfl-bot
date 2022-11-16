const { PermissionsBitField } = require("discord.js");
const fs = require("fs");

module.exports.run = (client) => {
  client.on("guildMemberAdd", async (member) => {
    let data = JSON.parse(fs.readFileSync(__dirname + "/../data/bot-data.json"));

    member.user.send("Welcome to the server");
  });
};
