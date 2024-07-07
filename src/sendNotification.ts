import { ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, WebhookClient } from 'discord.js';
import env from './environment';

const client = new WebhookClient({ url: env.WEBHOOK_URL });

export default async (data: string[][]): Promise<void> => {
  const embed = new EmbedBuilder()
    .setTitle('Notas actualizadas')
    .setURL(env.PUBLISHED_SHEET_URL)
    .setDescription('¡Actualizaron el excel con las notas!')
    .setTimestamp();

  for (const element of data) {
    const fields = element
      .map((value, index) => ({
        name: env.COLUMN_NAMES[index],
        value: value || 'N/A',
        inline: true,
      }))
      .filter(({ name }) => !name.startsWith('_'));

    embed.addFields(...fields);
  }

  const button = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel('Ver notas')
    .setURL(env.PUBLISHED_SHEET_URL)
    .setEmoji('📝');

  await client.send({
    embeds: [embed],
    components: [
      {
        type: ComponentType.ActionRow,
        components: [button],
      }
    ],
  });
}
