const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

if (!fs.existsSync(__dirname + "/data")) fs.mkdirSync(__dirname + "/data");
if (!fs.existsSync(__dirname + "/data/bot-data.json")) fs.writeFileSync(__dirname + "/data/bot-data.json", JSON.stringify({ guilds: {} }));

fs.readdir(__dirname + "/event/", (err, files) => {
  files.forEach((file) => {
    if (fs.existsSync(__dirname + "/event/" + file)) require(__dirname + "/event/" + file).run(client);
  });
});

client.login(process.env.token);
