module.exports.run = (client) => {
  client.on("interactionCreate", (interaction) => {
    try {
      if (interaction.isButton()) {
        require(`../interaction/button/${interaction.customId}/index`).run(interaction);
      } else if (interaction.isSelectMenu()) {
        require(`../interaction/selectMenu/${interaction.customId}/index`).run(interaction);
      } else if (interaction.isModalSubmit()) {
        require(`../interaction/modal/${interaction.customId}/index`).run(interaction);
      }
    } catch (error) {
      console.log(error);
    }
  });
};
