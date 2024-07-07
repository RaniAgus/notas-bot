import { Hono } from 'hono'
import getData from './getData'
import cache from './cache'
import sendNotification from './sendNotification'
import env from './environment'

const app = new Hono()

app.get('/', async (c) => {
  const table = await getData();

  if (!await cache.existsData()) {
    console.log('Cache not found');
    await cache.saveData(table);
    console.log('Cache created');
  } else if (await cache.hasChanged(table)) {
    console.log('Changes found');
    await sendNotification(table);
    console.log('Notification sent');
    await cache.saveData(table);
  } else {
    console.log('No changes found');
  }

  return c.json(table.map(
    row => row.reduce(
      (acc, cell, index) => ({ ...acc, [env.COLUMN_NAMES[index]]: cell }),
      {}
    )
  ));
});

export default {
  fetch: app.fetch,
  port: env.PORT,
};
