const fs = require('fs');

const getData = require('./helpers/getData');
const getDiscordClient = require('./helpers/getDiscordClient');
const sendNotification = require('./helpers/sendNotification');

require('dotenv').config();

const checkIfDataHasChanged = (client, data) => {
  if (!fs.existsSync(process.env.OUTPUT_FILE)) {
    fs.writeFileSync(process.env.OUTPUT_FILE, data);
    console.log('Archivo de notas creado');
    console.log(JSON.parse(data))
    return;
  }

  const oldData = fs.readFileSync(process.env.OUTPUT_FILE, 'utf8');
  if (oldData !== data) {
    console.log('Actualizaron el excel con las notas!');
    sendNotification(client, data);
    fs.writeFileSync(process.env.OUTPUT_FILE, data);
  } else {
    console.log(`[${new Date().toLocaleString()}] No hay novedades`);
  }
};

getDiscordClient().then(async (client) => {
  while (true) {
    const data = await getData();
    checkIfDataHasChanged(client, data);
    await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 5));
  }
});