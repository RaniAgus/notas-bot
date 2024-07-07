import Redis from 'ioredis';
import env from './environment';

class FileSystemCache {
  async exists(key: string): Promise<boolean> {
    return Bun.file(`${key}.json`).exists();
  }

  async get(key: string): Promise<string> {
    return Bun.file(`${key}.json`).text();
  }

  async set(key: string, value: string): Promise<void> {
    Bun.write(`${key}.json`, value);
  }
}

const client = env.CACHE_URL ? new Redis(env.CACHE_URL) : new FileSystemCache();

if (!env.CACHE_URL) {
  console.warn('Using file system cache');
}

const existsData = async (): Promise<boolean> => {
  return Boolean(await client.exists(env.CACHE_KEY));
}

const saveData = async (data: Object): Promise<void> => {
  await client.set(env.CACHE_KEY, JSON.stringify(data, null, 2));
}

const hasChanged = async (data: Object): Promise<boolean> => {
  return JSON.stringify(data, null, 2) !== await client.get(env.CACHE_KEY);
}

export default { existsData, saveData, hasChanged };
