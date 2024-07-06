const fs = require('fs');

const getData = require('./helpers/getData');
const getDiscordClient = require('./helpers/getDiscordClient');
const sendNotification = require('./helpers/sendNotification');
const env = require('./helpers/environment');

require('dotenv').config();

const checkIfDataHasChanged = (client, data) => {
  const dataStr = JSON.stringify(data, null, 2);
  if (!fs.existsSync(env.OUTPUT_FILE)) {
    fs.writeFileSync(env.OUTPUT_FILE, dataStr);
    console.log('Archivo de notas creado');
    data.forEach(row => console.table(row));
    return;
  }

  const oldData = fs.readFileSync(env.OUTPUT_FILE, 'utf8');
  if (oldData !== dataStr) {
    console.log(`Actualizaron el excel con las notas!`);
    sendNotification(client, data);
    fs.writeFileSync(env.OUTPUT_FILE, dataStr);
  } else {
    console.log(`No hay novedades`);
  }
};

getDiscordClient().then(async (client) => {
  while (true) {
    const data = await getData();
    checkIfDataHasChanged(client, data);
    await new Promise(resolve => setTimeout(() => resolve(), 1000 * 60 * 5));
  }
});
