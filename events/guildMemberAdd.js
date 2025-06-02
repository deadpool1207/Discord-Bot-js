const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const channel = member.guild.channels.cache.get(config.channels.welcome);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle(config.messages.welcomeTitle)
      .setDescription(config.messages.welcomeMessage.replace('{user}', `${member}`))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor(config.style.welcomeColor || 'Green')
      .setFooter({ text: config.style.embedFooter })
      .setTimestamp(config.style.embedTimestamp ? new Date() : null);

    channel.send({ embeds: [embed] });
  }
};
