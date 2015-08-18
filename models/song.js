module.exports = function(sequelize, DataTypes){
  var Song = sequelize.define("Song", {
    title: DataTypes.STRING,
    album: DataTypes.STRING,
    preview_url: DataTypes.STRING,
    artist_id: DataTypes.INTEGER
  });
}
