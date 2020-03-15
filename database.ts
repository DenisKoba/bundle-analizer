export {}

const mongodb = require('mongodb')
const mongoose = require('mongoose')
const MongoClient = mongodb.MongoClient

const Schema = mongoose.Schema

const BundleDetailsSchema = new Schema({
  date: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
  }
})

let _db

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

const mongoDB = () => {
    if (_db) {
        console.log(_db)
        return _db
    }

    return console.log('No database available')
}

exports.connect = connect
exports.mongoDB = mongoDB
exports.MobileBundle = mongoose.model('MobileBundle', BundleDetailsSchema)

