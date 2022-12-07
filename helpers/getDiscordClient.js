const discord = require('discord.js');

const getDiscordClient = () => {
  const client = new discord.Client({
    intents: [
      discord.GatewayIntentBits.Guilds,
      discord.GatewayIntentBits.GuildMessages,
    ],
    partials: [],
  });

  return new Promise(resolve => {
    client.login(process.env.DISCORD_TOKEN).then(() => {
      resolve(client);
    });
  })
}

module.exports = getDiscordClient;
