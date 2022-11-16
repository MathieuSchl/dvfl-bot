module.exports.run = (client) => {
  client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
      require(`../interaction/button/${interaction.customId}/index`).run(interaction);
    } else if (interaction.isModalSubmit()) {
      require(`../interaction/modal/${interaction.customId}/index`).run(interaction);
    }
  });
};
