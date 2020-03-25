export {};
const mongoose = require('mongoose')
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

const DBmodel = mongoose.model('DBmodel', BundleDetailsSchema)

module.exports = class DatabaseController {
    constructor(size: string, date: string, repo: string) {
        this.size = size
        this.date = date
        this.repo = repo
        this.bundle = new DBmodel({
            size: size,
            date: date,
            repo: repo
        })
    }

    repo = ''
    size = ''
    date = ''
    bundle = null

    save(date, newSize, repoName) {
        this.bundle = new DBmodel({
            size: newSize,
            date: date,
            repo: repoName
        })
        console.log('BUNDLE', this.bundle)
        return this.bundle
          .save()
          .then((data) => {
              return data
          })
          .catch(err => console.log(err))
    }

    fetchAll() {
        return DBmodel
          .find()
          .then((data) => {
              return data
          })
          .catch(err => console.log('ERROR', err))
    }

    fetch() {
        return DBmodel
          .find().sort({ _id: -1 }).limit(1)
          .then((data) => {
              return data
          })
          .catch(err => console.log('ERROR', err))
    }

}
