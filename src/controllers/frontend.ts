import { bundleDetailsModel } from '../types'
const { getBundleSize, isBuildSmallerThanPrevious } = require('../helpers/bundle-size')
const database = require('../helpers/database')
const socket = require('../socket/socket')

const saveIntoDatabase = (prevSize, newSize, repoName) => {
  if (isBuildSmallerThanPrevious(
    parseInt(prevSize.size),
    parseInt(newSize)
  )) {
    const date = new Date().getTime()
    return database
      .getController()
      .save(date, newSize, repoName)
      .then(data => {
        socket.getIO().emit('success', { data })
        return true
      })
      .catch(err => console.log(err))
  }

  socket.getIO().emit('fail', { status: 'failed' })
  return false
}

exports.getBundleSizes = (req, res, next) => {
  database
    .getController()
    .fetchAll()
    .then(data => {
      res.status(200).json({ data })
      socket.getIO().getIO().emit('success', data)
    })
    .catch(err => { throw new Error(err) })
}

exports.analizeBundleSizes = (req, res, next) => {
  database
    .getController()
    .fetch()
    .then(async (prevModel: bundleDetailsModel[]) => {
      const [prevSize] = prevModel
      const { nextSize, repo } = req.body

      const isAnalized = await saveIntoDatabase(prevSize, nextSize, repo)
      res.status(200).json({ status: isAnalized })
    })
    .catch(err => { throw new Error(err) })
}
