const venom = require('venom-bot');
const { startScheduler } = require('./scheduler');

venom
  .create({
    session: 'bot-goodnight',
    headless: false, // <- ini biar venom buka jendela Chrome yang keliatan
  })
  .then((client) => {
    console.log('✅ Bot aktif dan siap!');
    startScheduler(client);
  })
  .catch((erro) => {
    console.error('❌ Gagal start bot:', erro);
  });

setInterval(() => {
  console.log('Ping!');
}, 60000); // 60000 milidetik = 1 menit
