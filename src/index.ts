import { Hono } from 'hono'
import getData from './getData'
import cache from './cache'
import sendNotification from './sendNotification'
import env from './environment'

const app = new Hono()

app.get('/', async (c) => {
  const data = await getData();

  if (!await cache.existsData()) {
    console.log('Cache not found');
    await cache.saveData(data);

    console.log('Cache created');
    return c.json(data);
  }

  if (!await cache.hasChanged(data)) {
    console.log('No changes found');
    return c.json(data);
  }

  console.log('Changes found');

  await sendNotification(data);

  console.log('Notification sent');

  await cache.saveData(data);

  return c.json(data);
});

export default {
  fetch: app.fetch,
  port: env.PORT,
};
