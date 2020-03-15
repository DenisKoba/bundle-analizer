export {};
const database = require('./database')
const MobileBundle = require('./database').MobileBundle

module.exports = class DatabaseController {
    constructor(size: string, date: string, repo: string) {
        this.size = size
        this.date = date
        this.repo = repo
        this.bundle = new MobileBundle({
            size: size,
            date: date,
            repo: repo
        })
    }

    repo = ''
    size = ''
    date = ''
    bundle = null

    save() {
        return this.bundle
          .save()
          .then((data) => {
              return data
          })
          .catch(err => console.log(err))
    }

    fetch() {
        return MobileBundle
          .find().sort({ _id: -1 }).limit(1)
          .then((data) => {
              return data
          })
          .catch(err => console.log('ERROR', err))
    }

}
