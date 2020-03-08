const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const connect  = () => {
   return MongoClient.connect(
        'mongodb+srv://socialtech:Socialtechnologies@clusterbuildanalizer-r9lb1.mongodb.net/test?retryWrites=true&w=majority'
    )
        .then(client =>  _db = client.db())
        .catch(err => { throw err })
}

const mongoDB = () => {
    console.log(_db)
    if (_db) {
        console.log(_db)
        return _db
    }

    return console.log('No database available')
}

exports.connect = connect
exports.mongoDB = mongoDB
