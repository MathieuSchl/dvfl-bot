const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

async function start() {
  const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  await client.login(process.env.token);

  client.on("ready", async () => {
    const data = JSON.parse(fs.readFileSync(__dirname + "/data/bot-data.json"));
    await require("./utilitarian/messageRegister").run(client, "1019939573792522380", {
      title: data.script.NEW_USER_TITLE,
      description: data.script.NEW_USER_DESCRIPTION,
      color: 0x0099ff,
    });

    await client.destroy();
  });
}

start();
