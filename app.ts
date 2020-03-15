#!/usr/bin/env node

export {};
const database = require('./database')
const DatabaseController = require('./controller')
const { getBundleSize, compareBundleSizes } = require('./bundle-size')

const [,, path, repo] = process.argv

getBundleSize(path).then(size => {
  database.connect().then(() => {
    const date = new Date().getTime()
    const controller = new DatabaseController(size, date, repo)

    /*controller.save()
      .then(data => data)
      .catch(err => console.log(err))*/

    controller.fetch()
      .then((buildSize: string) => {
        compareBundleSizes(buildSize)
      })
      .catch(err => console.log(err))
  })
})
