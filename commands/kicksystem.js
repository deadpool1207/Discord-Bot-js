const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('🥾 Kickt einen Benutzer vom Server.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der gekickt werden soll')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('grund')
        .setDescription('Grund für den Kick')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('grund') || 'Kein Grund angegeben';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: '❌ Benutzer nicht gefunden.', ephemeral: true });
    }

    if (!member.kickable) {
      return interaction.reply({ content: '❌ Ich kann diesen Benutzer nicht kicken.', ephemeral: true });
    }

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setTitle('🥾 Benutzer gekickt')
      .setDescription(`**${user.tag}** wurde gekickt.`)
      .addFields({ name: 'Grund', value: reason })
      .setColor('Orange')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
