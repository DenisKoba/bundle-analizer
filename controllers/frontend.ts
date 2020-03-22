const database = require('../database')

exports.getBundleSizes = (req, res, next) => {
  database.getController()
    .fetch()
    .then(data => {
      res.status(200).json({ data })
      const io = require('../socket/socket')
      io.getIO().emit('success', data)
    })
    .catch(err => { throw new Error(err) })
}
