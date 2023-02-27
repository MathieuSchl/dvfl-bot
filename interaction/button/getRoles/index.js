const { SelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require("fs");

module.exports.run = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });
  const guild = interaction.guild;
  const member = interaction.member;

  try {
    const { embed, components } = await getEmbed(guild, interaction.message, member);

    await interaction.editReply({ embeds: [embed], components });
  } catch (error) {
    console.log(error);
    await interaction.editReply({ embeds: [{ title: "INTERNAL ERROR", color: 0xff0000 }] });
  }
};

module.exports.getEmbed = getEmbed;
async function getEmbed(guild, message, member, interaction) {
  const data = JSON.parse(fs.readFileSync(__dirname + "/../../../data/bot-data.json"));
  const dataGuild = data.guilds[guild.id];
  const dataMessage = dataGuild ? dataGuild.messages[message.id] : null;
  const listRoles = dataMessage ? dataMessage.button.addRole : null;

  const options = [];
  let description = "";

  for (const roleId of listRoles) {
    const role = await guild.roles.fetch(roleId);
    const userHasRole = interaction ? interaction.values.includes(roleId) : !!member.roles.cache.get(roleId);
    options.push({
      label: role.name,
      value: roleId,
      default: userHasRole,
    });

    description += `\n${userHasRole ? "✅" : "❌"} ${role.name} : <@&${roleId}>`;
  }

  const rowSelectMenu =
    listRoles.length !== 0
      ? new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId("roles")
            .setPlaceholder("Les rôles")
            .setMinValues(0)
            .setMaxValues(options.length)
            .addOptions(options)
        )
      : null;

  const rowButton =
    listRoles.length !== 0
      ? new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId("confirmRole").setLabel("Confirmer").setStyle(ButtonStyle.Primary)
        )
      : null;

  const components = [];
  if (rowSelectMenu) components.push(rowSelectMenu);
  if (rowButton) components.push(rowButton);

  return {
    embed: { title: components.length === 0 ? "NO_ROLE_LINKED" : "Choisissez vos rôles", description, color: 0x0099ff },
    components,
  };
}
