module.exports.run = async (interaction) => {
  const member = interaction.member;
  const guild = interaction.guild;

  if (interaction.message.reference) {
    const channel = interaction.channel;
    const messageReferenced = await channel.messages.fetch(interaction.message.reference.messageId);
    const { embed, components } = await require("../../button/getRoles/index").getEmbed(guild, messageReferenced, member, interaction);

    interaction.update({ embeds: [embed], components });
  }
};
