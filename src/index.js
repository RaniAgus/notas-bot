const getData = require('./helpers/getData');
const sendNotification = require('./helpers/sendNotification');
const env = require('./helpers/environment');
const cache = require('./helpers/cache');

require('dotenv').config();

const main = async () => {
  const data = await getData();

  if (!await cache.exists()) {
    cache.save(data);
    console.log('No hay datos en cache, se guardaron los actuales');
    data.forEach(row => console.table(row));
    return;
  }

  if (await cache.isEqualTo(data)) {
    console.log(`No hay novedades`);
    return;
  }

  console.log('Actualizaron el excel con las notas!');
  await sendNotification(data);
  await cache.save(data);
};

main();
setInterval(() => main(), env.INTERVAL);
