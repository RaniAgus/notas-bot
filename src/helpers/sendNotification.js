const discord = require('discord.js');
const env = require('./environment');

/**
 * @param {discord.Client} client
 * @param {Record<string, string>[]} data
 */
const sendNotification = async (client, data) => {
  const channel = client.channels.cache.get(env.DISCORD_CHANNEL);

  const embed = new discord.EmbedBuilder()
    .setTitle('Notas actualizadas')
    .setDescription('¡Actualizaron el excel con las notas!')
    .setTimestamp();

  for (const element of data) {
    const fields = Object.entries(element)
      .filter(([key]) => !key.startsWith('_'))
      .map(([key, value]) => ({
        name: key,
        value: value || 'N/A',
        inline: true,
      }));

    embed.addFields(...fields);
  }

  const button = new discord.ButtonBuilder()
    .setStyle(discord.ButtonStyle.Link)
    .setLabel('Ver notas')
    .setURL(env.PUBLISHED_SHEET_URL)
    .setEmoji('📝');

  await channel.send({ embeds: [embed], components: [
    new discord.ActionRowBuilder().setComponents(button)
  ]});
}

module.exports = sendNotification;
