const express = require('express')
const Router = express.Router()
const models = require('../db/connection').models
const Song = models.Song
const Artist = models.Artist

function error (response, message) {
  response.status(500)
  response.json({error: message})
}

function songsWithArtistNames (songs, artists) {
  return songs.map(song => {
    const artist = artists.find(artist => artist.id === song.artistId)
    song.artistName = artist.name
    return song
  })
}

Router.get('/songs', (req, res) => {
  Song.findAll().then(songs => Artist.findAll().then(artists => {
    res.render('songs/index', {songs: songsWithArtistNames(songs, artists)})
  }))
})

Router.get('/songs/new', (req, res) => {
  Artist.findAll().then(artists => res.render('songs/new', {artists}))
})

Router.post('/songs', (req, res) => req.body.artistId 
  ? Song.create(req.body).then(song => res.redirect('/songs/' + song.id))
  : error(res, 'Artist not found')
)

Router.get('/songs/:id', (req, res) => {
  Song.findById(req.params.id).then(song => song 
    ? song.getArtist().then(artist => {
      song.artistName = artist.name
     res.render('songs/show', {song}) })
    : error(res, 'not found')
  )
})

Router.get('/songs/:id/edit', (req, res) => {
  Song.findById(req.params.id).then(song => {
    if(!song) return error(res, 'not found')
    res.render('songs/edit', {song})
  })
})

Router.put('/songs/:id', (req, res) => req.body.artistId 
  ? Song.findById(req.params.id).then(song => song
    ? song.updateAttributes(req.body).then(updatedSong => res.redirect('/songs/' + updatedSong.id))
    : error(res, 'not found') )
  : error(res, 'Artist not found')
)

Router.delete('/songs/:id', (req, res) => {
  Song.findById(req.params.id).then(song => song 
    ? song.destroy().then(_ => res.redirect('/songs'))
    : error(res, 'not found')
  )
})

module.exports = Router
