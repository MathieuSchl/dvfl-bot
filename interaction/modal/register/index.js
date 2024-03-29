const { PermissionFlagsBits } = require("discord.js");
const botData = require("../../../data/bot-data.json");

module.exports.run = async (interaction) => {
  interaction.deferReply();
  const name = interaction.fields.getField("name").value;
  const me = await interaction.guild.members.fetch(interaction.client.user.id);
  if (me.permissions.has(PermissionFlagsBits.ManageNicknames)) {
    if (me.roles.highest.position > interaction.member.roles.highest.position) {
      interaction.member.setNickname(name);
      interaction.member.send(`Ton nom est maintenant \`${name}\` sur le serveur \`${interaction.guild.name}\``);
    } else {
      interaction.member.send(
        `Je ne peux pas modifier ton nom sur le serveur \`${interaction.guild.name}\`, ton rôle est supérieur au mien`
      );
    }
  } else {
    interaction.member.send(
      `Désolé je n'ai pas le droit de changer ton pseudo sur le serveur \`${interaction.guild.name}\``
    );
  }
  interaction.deleteReply();

  const member = interaction.member;
  const guild = interaction.guild;
  const role = await guild.roles.fetch(botData.guilds[guild.id].welcomeRoleId);
  const highestRole = member.roles.highest;

  const diffPos = guild.roles.comparePositions(role, highestRole);
  if (diffPos > 0) await member.roles.add(role);

  const message = interaction.message;
  const roles = botData.guilds[guild.id].messages[message.id].button.addRole;
  for (const roleToAdd of roles) {
    await member.roles.add(roleToAdd);
  }
};
