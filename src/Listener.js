/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const songsPlaylist = await this._playlistService.getSongsByPlaylistId(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songsPlaylist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
