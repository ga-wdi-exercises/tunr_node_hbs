const Sequelize = require('sequelize')
const ormInstance = new Sequelize('postgres:///tunr_db')
const Artist = ormInstance.import('../models/artist')
const Song = ormInstance.import('../models/song')

Artist.hasMany(Song, {onDelete: 'CASCADE'})
Song.belongsTo(Artist)

module.exports = {
  Sequelize,
  ormInstance,
  models: { Artist, Song }
}
