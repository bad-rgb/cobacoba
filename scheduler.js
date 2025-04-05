const nomorTujuan = '6282179349370@c.us'; // ganti dengan nomor target WA

let sudahKirimPagi = false;
let sudahKirimMalam = false;

function startScheduler(client) {
  setInterval(async () => {
    const jam = new Date().getHours();

    // Waktu MALAM: jam 21 - 23
    const isWaktuMalam = jam >= 21 && jam <= 23;

    // Waktu PAGI: jam 1 - 5
    const isWaktuPagi = jam >= 1 && jam <= 5;

    try {
      const chat = await client.getChatById(nomorTujuan);
      const pesanTerakhir = chat.messages[chat.messages.length - 1];
      const waktuTerakhir = new Date(pesanTerakhir.timestamp * 1000);
      const sekarang = new Date();

      const selisihJam = (sekarang - waktuTerakhir) / (1000 * 60 * 60); // dalam jam

      if (isWaktuPagi && !sudahKirimPagi && selisihJam >= 6) {
        await client.sendText(
          nomorTujuan,
          'Selamat pagi yaa 🌞✨ (ini bot yang ngirim karena OWNER lagi tidur hehe)'
        );
        sudahKirimPagi = true;
        sudahKirimMalam = false;
        console.log('✅ Pesan pagi dikirim');
      }

      if (isWaktuMalam && !sudahKirimMalam && selisihJam >= 6) {
        await client.sendText(
          nomorTujuan,
          'Selamat tidur, semoga mimpi indah 🌙💤 (bot yang ngirim, OWNER lagi ga sempet 💤)'
        );
        sudahKirimMalam = true;
        sudahKirimPagi = false;
        console.log('✅ Pesan malam dikirim');
      }
    } catch (e) {
      console.error('❌ Error kirim pesan:', e.message);
    }
  }, 1000 * 60 * 5); // Cek setiap 5 menit
}

module.exports = { startScheduler };
