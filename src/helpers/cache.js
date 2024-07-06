const Redis = require('ioredis');
const fs = require('fs');
const env = require('./environment');

class FileSystemCache {
  async exists(key) {
    return fs.existsSync(this.#keyOf(key));
  }

  async get(key) {
    const data = fs.readFileSync(this.#keyOf(key), 'utf8');
    return JSON.parse(data);
  }

  async set(key, data) {
    fs.writeFileSync(this.#keyOf(key), JSON.stringify(data, null, 2));
  }

  #keyOf(key) {
    return `${key}.json`;
  }
}

const client = env.CACHE_URL ? new Redis(env.CACHE_URL) : new FileSystemCache();

if (!env.CACHE_URL) {
  console.warn(`No se ha especificado CACHE_URL, se usará el archivo ${env.CACHE_KEY}.json como caché`);
}

const cache = {
  exists: async () => {
    return await client.exists(env.CACHE_KEY);
  },
  save: async (data) => {
    await client.set(env.CACHE_KEY, JSON.stringify(data, null, 2));
  },
  isEqualTo: async (data) => {
    return JSON.stringify(data, null, 2) === await client.get(env.CACHE_KEY);
  }
};

module.exports = cache;
