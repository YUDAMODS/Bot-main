// index.js

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const settings = require('./settings');
const figlet = require('figlet');
const lolcatjs = require('lolcatjs');

// Inisialisasi bot dengan token dari settings.js
const bot = new TelegramBot(settings.telegramToken, { polling: true });

// Fungsi untuk mencatat aktivitas penggunaan bot di console log
function logActivity(msg) {
  const user = msg.from;
  const chat = msg.chat;
  const command = msg.text.toLowerCase();

  console.log(`Aktivitas Penggunaan Bot Telegram`);
  console.log(`• User ID: ${user.id}`);
  console.log(`• Username: ${user.username || 'Tidak ada'}`);
  console.log(`• Chat ID: ${chat.id}`);
  console.log(`• Perintah: ${command}`);
}

// Fungsi untuk menampilkan pesan di console dengan lolcat
function logWithFiglet(text) {
  figlet('YudaMods', function(err, data) {
    if (err) {
      console.error('Something went wrong with figlet');
      console.error(err);
      return;
    }
    lolcatjs.fromString(data + '\n' + text);
  });
}

// Fungsi untuk menampilkan pesan bot is running di console
function logBotIsRunning() {
  console.log('Bot is running...');
}

// Event listener untuk pesan dari pengguna
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const command = msg.text.toLowerCase();

  // Mencatat aktivitas penggunaan bot di console log
  logActivity(msg);

  // Menggunakan switch case untuk memproses perintah
  switch (command) {
    case '/owner':
      // Mengirimkan kontak dengan ID pemilik bot
      owners.forEach(ownerId => {
        bot.sendContact(chatId, ownerId, "Owner");
      });
      break;

    case '/ping':
      // Menampilkan pesan pong sebagai respons ping
      bot.sendMessage(chatId, 'Pong!');
      break;

    case '/runtime':
      // Menampilkan waktu berjalannya bot
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      bot.sendMessage(chatId, `Bot telah berjalan selama: ${hours} jam, ${minutes} menit, ${seconds} detik.`);
      break;

    case '/speed':
      // Menampilkan kecepatan respons bot
      const startTime = Date.now();
      bot.sendMessage(chatId, 'Mengukur kecepatan...');
      const endTime = Date.now();
      const speed = endTime - startTime;
      bot.sendMessage(chatId, `Kecepatan respons bot: ${speed} ms`);
      break;

    case '/youtube':
      // Menampilkan link ke kanal YouTube
      bot.sendMessage(chatId, 'Kunjungi kanal YouTube YUDAMODS: https://youtube.com/@YUDAMODS');
      break;

    case '/creator':
      // Menampilkan nama pencipta bot
      bot.sendMessage(chatId, 'Pencipta bot: YUDAMODS');
      break;

    case '/left':
      // Keluar dari channel atau grup
      bot.sendMessage(chatId, 'Bot akan meninggalkan channel atau grup ini...');
      bot.leaveChat(chatId);
      break;

    case '/restart':
      // Merestart bot
      bot.sendMessage(chatId, 'Merestart bot...');
      process.exit(0);
      break;

    case '/ai':
      // Mengaktifkan AI menggunakan API ChatGPT
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'text-davinci-003', // Ganti dengan model yang Anda inginkan
          messages: [
            {
              role: 'user',
              content: 'Hello, I have a question.'
            }
          ]
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.openaiApiKey}`
          }
        });
        const botResponse = response.data.choices[0].message.content;
        bot.sendMessage(chatId, botResponse);
      } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.');
      }
      break;

    default:
      // Perintah tidak dikenali
      bot.sendMessage(chatId, 'Perintah tidak dikenali.');
  }
});

// Event listener untuk memastikan bot berjalan
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// Menampilkan pesan figlet dan bot is running saat bot berhasil berjalan
bot.on('polling', () => {
  logWithFiglet('Bot is running...');
});

// Memulai bot
bot.startPolling();

// Log bot is running di console
logBotIsRunning();
