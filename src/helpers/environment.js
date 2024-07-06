require('dotenv').config();


/**
 * @typedef {Object} Environment
 * @property {string[]} QUERY
 * @property {string[]} COLUMN_NAMES
 * @property {string} PUBLISHED_SHEET_URL
 * @property {string} DISCORD_CHANNEL
 * @property {string} DISCORD_TOKEN
 * @property {number} INTERVAL
 * @property {string} OUTPUT_FILE
 */

const variables = [
  { name: 'QUERY', type: 'array' },
  { name: 'COLUMN_NAMES', type: 'array' },
  { name: 'PUBLISHED_SHEET_URL', type: 'string' },
  { name: 'DISCORD_CHANNEL', type: 'string' },
  { name: 'DISCORD_TOKEN', type: 'string' },
  { name: 'INTERVAL', type: 'number', defaultValue: 1000 * 60 * 5 },
  { name: 'OUTPUT_FILE', type: 'string' },
];

/**
 * @type {Environment}
 */
const env = {};
const errors = [];

for (const variable of variables) {
  const value = process.env[variable.name];
  if (!value) {
    if (variable.defaultValue) {
      env[variable.name] = variable.defaultValue;
    } else {
      errors.push(variable.name);
    }
    continue;
  }

  if (variable.type === 'array') {
    env[variable.name] = value.split(',');
  } else if (variable.type === 'number') {
    env[variable.name] = parseInt(value, 10);
  } else {
    env[variable.name] = value;
  }
}

if (errors.length) {
  throw new Error(`Missing environment variables: ${errors.join(', ')}`);
}

module.exports = env;
