module.exports = function(sequelize, DataTypes){
  return sequelize.define("artist", {
    name: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    nationality: DataTypes.STRING
  });
}
