const DB = require('./connection')

DB.ormInstance.sync({force: true}).then(_ => process.exit())
