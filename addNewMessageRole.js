const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");

async function start() {
  const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  await client.login(config.token);

  client.on("ready", async () => {
    await require("./utilitarian/messageChooseRole").run(client, "1019939573792522380", { title: "test", description: "test", color: 0x0099ff });

    await client.destroy();
  });
}

start();
