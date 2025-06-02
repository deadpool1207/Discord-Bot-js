const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🔨 Bannt einen Benutzer vom Server.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der gebannt werden soll')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('grund')
        .setDescription('Grund für den Ban')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('grund') || 'Kein Grund angegeben';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: '❌ Benutzer nicht gefunden.', ephemeral: true });
    }

    if (!member.bannable) {
      return interaction.reply({ content: '❌ Ich kann diesen Benutzer nicht bannen.', ephemeral: true });
    }

    await member.ban({ reason });

    const embed = new EmbedBuilder()
      .setTitle('🔨 Benutzer gebannt')
      .setDescription(`**${user.tag}** wurde gebannt.`)
      .addFields({ name: 'Grund', value: reason })
      .setColor('Red')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
