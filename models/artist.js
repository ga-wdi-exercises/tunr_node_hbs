const _ = require('lodash')

module.exports = (ormInstance, {STRING, ...Sequelize}) => {
  const Artist = ormInstance.define('artist', {
    name: STRING,
    photoUrl: STRING,
    nationality: STRING
  },
  {
    instanceMethods: {
      shuffle: function(){
        return _.sample(this.getSongs())
      }
    }
  })
  return Artist
}
