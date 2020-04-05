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
  constructor(private size: string, private date: string, private repo: string) {
    this.bundle = new DBmodel({
      size: size,
      date: date,
      repo: repo
    })
  }

  bundle = null

    save(date, newSize, repoName) {
      this.bundle = new DBmodel({
        size: newSize,
        date: date,
        repo: repoName,
      })
      return this.bundle
        .save()
        .then(data => data)
        .catch(err => console.log('Failed to save the bundle size', err))
    }

    fetchAll() {
      return DBmodel
        .find()
        .then((data) => {
          return data
        })
        .catch(err => console.log('Failed to fetch all bundle sizes', err))
    }

    fetchLast(repo) {
      return DBmodel
        .find({ repo }).sort({ _id: -1 }).limit(1)
        .then((data) => {
          console.log(data)
          return data
        })
        .catch(err => console.log('Failed to fetch the latest bundle size', err))
    }

}
