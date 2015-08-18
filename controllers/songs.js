var express = require("express");
var router = express.Router();
var Song = require("../db/connection").models.Song;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/songs", function(req, res){
  Song.findAll().then(function(songs){
    res.json(songs);
  });
});

router.post("/songs", function(req, res){
  Song.create(req.body).then(function(song){
    res.json(song);
  });
});

router.get("/songs/:id", function(req, res){
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    res.json(song);
  });
});

router.patch("/songs/:id", function(req, res){
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    song.updateAttributes(req.body).then(function(updatedSong){
      res.json(updatdSong);
    });
  });
});

router.delete("/songs/:id", function(req, res){
  Song.findById(req.params.id).then(function(song){
    if(!song) return error(res, "not found");
    song.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
