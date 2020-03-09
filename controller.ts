// @ts-ignore
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
        console.log('FETCH', this.bundle)
        return this.bundle
          .find()
          .then((data) => {
              console.log(data)
              return data
          })
          .catch(err => console.log(err))
    }

}
