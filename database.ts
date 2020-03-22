export {}
const DatabaseController = require('./controllers/dbcontroller')
const mongoose = require('mongoose')



let _db
let dbcontroller

// @ts-ignore
const connect  = () => {
   return mongoose.connect(
        'mongodb+srv://socialtech:Socialtechnologies@clusterbuildanalizer-r9lb1.mongodb.net/test?retryWrites=true&w=majority'
    )
        .then(client => {
          return client
        })
        .catch(err => console.log(err))
}

const setupController = (newSize, date, repo) => {
  dbcontroller = new DatabaseController(newSize, date, repo)
}

const getController = () => {
  if (!dbcontroller) {
    throw new Error('no db controller available')
  }

  return dbcontroller
}

const mongoDB = () => {
    if (_db) {
        return _db
    }

    return console.log('No database available')
}

exports.connect = connect
exports.mongoDB = mongoDB
exports.setupController = setupController
exports.getController = getController

