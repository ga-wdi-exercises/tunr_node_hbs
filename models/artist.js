module.exports = function(sequelize, DataTypes){
  var Artist = sequelize.define("Artist", {
    title: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    nationality: DataTypes.STRING
  });
}
