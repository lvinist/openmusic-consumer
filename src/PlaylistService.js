/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsByPlaylistId(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
            INNER JOIN playlistsongs ON playlistsongs.song_id = songs.id
            WHERE playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistService;
