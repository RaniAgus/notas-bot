const axios = require('axios').default;

const sendNotification = async () => {
  await axios.post(`https://graph.facebook.com/v15.0/${process.env.WHATSAPP_NUMBER}/messages`, {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: process.env.WHATSAPP_TO,
    type: 'text',
    text: {
      body: 'Actualizaron el excel con las notas!',
    },
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
    },
  });
}

module.exports = sendNotification;
