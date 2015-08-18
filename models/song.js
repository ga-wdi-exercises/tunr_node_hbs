module.exports = function(sequelize, DataTypes){
  return sequelize.define("song", {
    title: DataTypes.STRING,
    album: DataTypes.STRING,
    previewUrl: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  });
}
