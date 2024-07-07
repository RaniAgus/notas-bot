const discord = require('discord.js');
const env = require('./environment');

const client = new discord.WebhookClient({ url: env.WEBHOOK_URL });

/**
 * @param {discord.Client} client
 * @param {Record<string, string>[]} data
 */
const sendNotification = async (data) => {
  const embed = new discord.EmbedBuilder()
    .setTitle('Notas actualizadas')
    .setURL(env.PUBLISHED_SHEET_URL)
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

  const actionRow = new discord.ActionRowBuilder()
    .setComponents(button);

  await client.send({
    embeds: [embed],
    components: [actionRow],
  });
}

module.exports = sendNotification;
