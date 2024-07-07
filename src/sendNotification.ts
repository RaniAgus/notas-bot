import { ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, WebhookClient } from 'discord.js';
import env from './environment';

const client = new WebhookClient({ url: env.WEBHOOK_URL });

export default async (data: Record<string, string>[]): Promise<void> => {
  const embed = new EmbedBuilder()
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
