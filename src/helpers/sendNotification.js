const discord = require('discord.js');

const sendNotification = async (client, data) => {
  const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL);

  const embed = new discord.EmbedBuilder()
    .setTitle('Notas actualizadas')
    .setDescription('¡Actualizaron el excel con las notas!')
    .setTimestamp();

  const button = new discord.ButtonBuilder()
    .setStyle(discord.ButtonStyle.Link)
    .setLabel('Ver notas')
    .setURL(process.env.PUBLISHED_SHEET_URL)
    .setEmoji('📝');

  await channel.send({ embeds: [embed], components: [
    new discord.ActionRowBuilder().setComponents(button)
  ]});
}

module.exports = sendNotification;
