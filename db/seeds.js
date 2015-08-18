var DB = require("./connection");
var data = {
  artists: require("./artist_data"),
  songs: require("./song_data")
}

DB.models.Artist.bulkCreate(data.artists).done(function(){
  DB.models.Artist.findAll().done(function(artists){
    var a, artist, s, song, songs, output = [];
    for(a = 0; a < artists.length; a++){
      artist = artists[a];
      songs = data.songs[artist.name];
      for(s = 0; s < songs.length; s++){
        song = songs[s];
        song.artistId = artist.id;
        output.push(song);
      }
    }
    DB.models.Song.bulkCreate(output).done(function(){
      process.exit();
    })
  });
});
