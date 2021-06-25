require('dotenv').config();
const amqp = require('amqplib');
const MailSender = require('./Mailsender');
const Listener = require('./Listener');
const PlaylistService = require('./PlaylistService');

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:Songsplaylists', {
    durable: true,
  });

  await channel.consume('export:Songsplaylists', listener.listen, { noAck: true });
};

init();
