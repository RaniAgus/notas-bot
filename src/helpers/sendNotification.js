const discord = require('discord.js');
const env = require('./environment');

const sendNotification = async (client, data) => {
  const channel = client.channels.cache.get(env.DISCORD_CHANNEL);

  const transformedData = data.map(element => {
    const fields = [];
    for (const key in element) {
      if (key.startsWith('_')) {
        continue;
      }
      fields.push({
        name: key,
        value: element[key] || 'N/A',
        inline: true
      });
    }
    return fields;
  });

  const embed = new discord.EmbedBuilder()
    .setTitle('Notas actualizadas')
    .setDescription('¡Actualizaron el excel con las notas!')
    .setTimestamp();

  for (const fields of transformedData) {
    embed.addFields(...fields);
  }

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
