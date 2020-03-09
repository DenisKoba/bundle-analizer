// @ts-ignore
const database = require('./database')
const DatabaseController = require('./controller')

const [,, size, repo] = process.argv

database.connect().then(() => {
  const date = new Date().getTime()
  const controller = new DatabaseController(size, date, repo)
  controller.save()
    .then(data => console.log(data))
    .catch(err => console.log(err))

  controller.fetch()
    .then(data => console.log(data))
    .catch(err => console.log(err))
})
