var express = require("express");
var router = express.Router();
var models = require("../db/connection").models;
var Song = models.Song;
var Artist = models.Artist;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

function songsWithArtistNames(songs, artists){
  var s, a;
  for(s in songs){
    for(a in artists){
      if(artists[a].id == songs[s].artistId){
        songs[s].artistName = artists[a].name;
        break;
      }
    }
  }
  return songs;
}

router.get("/songs", function(req, res){
  Song.findAll().then(function(songs){
    Artist.findAll().then(function(artists){
      res.render("songs/index", {songs: songsWithArtistNames(songs, artists)});
    });
  });
});

router.get("/songs/new", function(req, res){
  res.render("songs/new");
})

router.post("/songs", function(req, res){
  if(!req.body.artistId) return error(res, "Artist not found");
  Song.create(req.body).then(function(song){
    res.redirect("/songs/" + song.id)
  });
});

router.get("/songs/:id", function(req, res){
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    song.getArtist().then(function(artist){
      song.artistName = artist.name;
      res.render("songs/show", {song: song});
    });
  });
});

router.get("/songs/:id/edit", function(req, res){
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    res.render("songs/edit", {song: song});
  });
});

router.put("/songs/:id", function(req, res){
  if(!req.body.artistId) return error(res, "Artist not found");
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    song.updateAttributes(req.body).then(function(updatedSong){
      res.json(updatedSong);
    });
  });
});

router.delete("/songs/:id", function(req, res){
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    song.destroy().then(function(){
      res.redirect("/songs")
    });
  });
});

module.exports = router;
