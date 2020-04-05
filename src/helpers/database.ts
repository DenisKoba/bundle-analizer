export {}
const DatabaseController = require('../controllers/dbcontroller')
const mongoose = require('mongoose')



let _db
let dbcontroller

// @ts-ignore
const connect  = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@clusterbuildanalizer-r9lb1.mongodb.net/${process.env.DB_NAME}`
  )
    .then(client => {
      return client
    })
    .catch(err => console.log(err))
}

const setupController = (newSize = 0, date = '', repo = '') => {
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

