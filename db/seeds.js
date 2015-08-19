var DB = require("./connection");
var Seeds = {
  artists: require("./artist_data"),
  songs: require("./song_data")
}

DB.models.Artist.bulkCreate(Seeds.artists)
.then(function(){
  return DB.models.Artist.findAll();
})
.then(function(artists){
  var a, artist, s, song, songs, output = [];
  for(a = 0; a < artists.length; a++){
    artist = artists[a];
    songs = Seeds.songs[artist.name];
    for(s = 0; s < songs.length; s++){
      song = songs[s];
      song.artistId = artist.id;
      output.push(song);
    }
  }
  return DB.models.Song.bulkCreate(output);
})
.then(function(){
  process.exit();
});
