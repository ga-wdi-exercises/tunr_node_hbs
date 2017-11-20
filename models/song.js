module.exports = function(ormInstance, { STRING, INTEGER, ...Sequelize}){
  const Song = ormInstance.define('song', {
    title: STRING,
    album: STRING,
    previewUrl: STRING
  })

  return Song
}
