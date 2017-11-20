const express = require('express')
const Router  = express.Router()
const DB      = require('../db/connection')
const Artist  = DB.models.Artist

function error (response, message) {
  response.status(500)
  response.json({error: message})
}

Router.get('/artists', (req, res) => {
  Artist.findAll().then(artists => res.render('artists/index', {artists}))
})

Router.get('/artists/new', (req, res) => res.render('artists/new'))

Router.post('/artists', (req, res) => {
  Artist.create(req.body).then(artist => res.redirect('/artists/' + artist.id))
})

Router.get('/artists/:id', (req, res) => {
  Artist.findById(req.params.id).then(artist => artist
    ? artist.getSongs().then(songs => {
      res.render('artists/show', {artist: artist, songs: songs})
    })
    : error(res, 'not found')
  )
})

Router.get('/artists/:id/edit', (req, res) => {
  Artist.findById(req.params.id).then(artist => artist 
    ? res.render('artists/edit', {artist})
    : error(res, 'not found')
  )
})

Router.put('/artists/:id', (req, res) => {
  Artist.findById(req.params.id)
  .then(artist => artist 
    ? artist.updateAttributes(req.body).then(artist => 
      artist.getSongs().then(songs => res.render('artists/show', { artist, songs }))
    )
    : error(res, 'not found')
  )
})

Router.delete('/artists/:id', (req, res) => {
  Artist.findById(req.params.id)
  .then(artist => artist
    ? artist.destroy()
    : error(res, 'not found')
  // )
  // .then(function(){
  )
  res.redirect('/artists')
})

module.exports = Router
