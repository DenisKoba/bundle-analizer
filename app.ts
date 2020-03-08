const database = require('./database')


database.connect().then(() => database.mongoDB())

