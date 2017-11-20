const DB = require('./connection');
const Seeds = {
  artists: require('./artist_data'),
  songs: require('./song_data')
}

DB.models.Artist.bulkCreate(Seeds.artists)
.then(_ => DB.models.Artist.findAll())
.then(artists => {
  const songs = artists.reduce((songsAcc, artist) => {
    const artistsSongs = Seeds.songs[artist.name].map(song => (song.artistId = artist.id, song))
    return [...songsAcc, ...artistsSongs]
  }, [])
  return DB.models.Song.bulkCreate(songs);
})
.then(_ => process.exit())
