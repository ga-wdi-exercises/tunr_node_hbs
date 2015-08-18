# Tunr 1.0!

Tunr is the worlds #1 music web app (those Spotify haters can't keep up with us).

## Specifications

Tunr provides a RESTful web interface to Songs and Artists.

### Schema

* artists
  * id
  * name
  * photo_url
  * nationality

* songs
  * id
  * title
  * album
  * preview_url
  * artist_id


For Artists, a user should be able to:
  * view a list of all artists
  * view detailed information on a specific artist
    * that page should list all songs by the artist
  * add a new artist
  * edit an existing artist
  * delete a artist

For Songs, a user should be able to:
  * view a list of all songs
  * view detailed information on a specific song
  * add a new song (using the artist_id # to connect it to an artist
  * edit an existing song
  * delete a song

## Bonus

### Playlists

For playlists, a user should be able to:
* view a list of all playlists
* view a specific playlist (the songs on it)
* add a new playlist
* add songs to an existing playlist
* remove songs from an existing playlist
* delete a playlist

### Even More Features

Add MORE features to Tun.r. Be creative and do whatever you want!

If you need some ideas, though, here are a few:
* Use a select box of artist names instead of artist_id when adding/editing
  songs.
* Use [HTML5 Audio](http://www.w3schools.com/html/html5_audio.asp) tag to embed
  an audio player (for the preview url) next to every song.
* Add some style using CSS
