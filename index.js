const fs = require('fs');
const getData = require('./helpers/getData');
const sendNotification = require('./helpers/sendNotification');

require('dotenv').config();

const checkIfDataHasChanged = (data) => {
  if (!fs.existsSync(process.env.OUTPUT_FILE)) {
    fs.writeFileSync(process.env.OUTPUT_FILE, data);
    return;
  }

  const oldData = fs.readFileSync(process.env.OUTPUT_FILE, 'utf8');
  if (oldData !== data) {
    console.log('Actualizaron el excel con las notas!');
    sendNotification();
    fs.writeFileSync(process.env.OUTPUT_FILE, data);
  } else {
    console.log('No hay novedades');
  }
};

(async () => {
  while (true) {
    getData().then(checkIfDataHasChanged);
    await new Promise(resolve => setTimeout(resolve, 1000 * 60 * 5));
  }
})();
