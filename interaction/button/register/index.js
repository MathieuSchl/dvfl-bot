const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports.run = async (interaction) => {
  //interaction.deferReply();

  const modal = new ModalBuilder().setCustomId("register").setTitle("S'enregistrer");

  // Add components to modal

  // Create the text input components
  const nameInput = new TextInputBuilder()
    .setCustomId("name")
    .setLabel("Quel est ton prénom ?")
    .setPlaceholder("Ton prénom")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(32);

  const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
  modal.addComponents(firstActionRow);

  // Show the modal to the user
  await interaction.showModal(modal);
};
