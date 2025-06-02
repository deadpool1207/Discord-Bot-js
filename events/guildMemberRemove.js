const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    const channel = member.guild.channels.cache.get(config.channels.farewell);
    if (!channel) return;

    const farewellMsg = config.messages.farewellMessage.replace('{user}', `${member.user.tag}`);

    const embed = new EmbedBuilder()
      .setTitle(config.messages.farewellTitle)
      .setDescription(farewellMsg)
      .setColor(config.style.farewellColor || 'Red')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: config.style.embedFooter })
      .setTimestamp(config.style.embedTimestamp ? new Date() : null);

    channel.send({ embeds: [embed] });
  }
};
