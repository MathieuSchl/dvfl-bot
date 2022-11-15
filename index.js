const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.login(config.token);
