var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///tunr_db");
var Artist = sequelize.import("../models/artist");
var Song = sequelize.import("../models/song");

Song.belongsTo(Artist);
Artist.hasMany(Song);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    Song: Song,
    Artist: Artist
  }
}
