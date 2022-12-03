const { SelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require("fs");

module.exports.run = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });

  const member = interaction.member;
  const options = interaction.message.components[0].components[0].data.options;
  const roleAdd = [];
  const roleRemove = [];

  for (const option of options) {
    //test if member have the role
    if (!!member.roles.cache.get(option.value)) {
      if (!option.default) {
        await member.roles.remove(option.value);
        roleRemove.push(option.value);
      }
    } else {
      if (option.default) {
        await member.roles.add(option.value);
        roleAdd.push(option.value);
      }
    }
  }

  const embed = await new Promise((resolve, reject) => {
    if (roleAdd.length === 0 && roleRemove.length === 0) resolve({ title: "Aucun rôle n'a été modifié", color: 0x0099ff });
    else {
      const title = "Les rôles ont été mis à jour :";
      let description = "";
      if (roleAdd.length !== 0) {
        description += `Rôle${roleAdd !== 1 ? "s" : ""} ajouté${roleAdd !== 1 ? "s" : ""} :\n`;
        for (const role of roleAdd) {
          description += `- <@&${role}>\n`;
        }
      }
      if (roleRemove.length !== 0) {
        description += `Rôle${roleRemove.length !== 1 ? "s" : ""} retiré${roleRemove.length !== 1 ? "s" : ""} :\n`;
        for (const role of roleRemove) {
          description += `- <@&${role}>\n`;
        }
      }
      resolve({ title, description, color: 0x40fa12 });
    }
  });
  await interaction.editReply({ embeds: [embed] });
};
