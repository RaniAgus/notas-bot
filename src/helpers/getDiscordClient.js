const discord = require('discord.js');
const env = require('./environment');

/**
 * @returns {Promise<discord.Client>}
 */
const getDiscordClient = async () => {
  const client = new discord.Client({
    intents: [
      discord.GatewayIntentBits.Guilds,
      discord.GatewayIntentBits.GuildMessages,
    ],
    partials: [],
  });

  await client.login(env.DISCORD_TOKEN);

  return client;
}

module.exports = getDiscordClient;
