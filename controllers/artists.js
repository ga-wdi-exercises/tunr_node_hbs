var express = require("express");
var router = express.Router();
var Artist = require("../db/connection").models.Artist;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/artists", function(req, res){
  Artist.findAll().then(function(artists){
    res.json(artists);
  });
});

router.post("/artists", function(req, res){
  Artist.create(req.body).then(function(artist){
    res.json(artist);
  });
});

router.get("/artists/:id", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    res.json(artist);
  });
});

router.get("/artists/:id/songs", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    artist.getSongs().then(function(songs){
      res.send(songs);
    });
  });
});

router.patch("/artists/:id", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    artist.updateAttributes(req.body).then(function(updatedArtist){
      res.json(updatedArtist);
    });
  });
});

router.delete("/artists/:id", function(req, res){
  Artist.findById(req.params.id).then(function(artist){
    if(!artist) return error(res, "not found");
    artist.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
