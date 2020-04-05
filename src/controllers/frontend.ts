import { bundleDetailsModel } from '../types'
const { isBuildSmallerThanPrevious } = require('../database/bundle-size')
const database = require('../database/database')
const socket = require('../socket/socket')

const passDataIntoDB = (newSize, repoName) => {
  const date = new Date().getTime()

  return database
    .getController()
    .save(date, newSize, repoName)
    .then(data => {
      socket.getIO().emit('success', { data })
      return true
    })
    .catch(err => console.log('failed'))
}

const saveIntoDatabase = (prevSize, newSize, repoName) => {
  if (isBuildSmallerThanPrevious(
    parseInt(prevSize.size),
    parseInt(newSize)
  )) {
    return passDataIntoDB(newSize, repoName)
  }

  socket.getIO().emit('fail', { status: 'failed' })
  return false
}

exports.saveBundleData = (req, res, next) => {
  const { prevSize, nextSize, repo } = req.body

  saveIntoDatabase(prevSize, nextSize, repo)
    .then(() => res.status(200).json({ status: 'success' }))
}

exports.getBundleSizes = (req, res, next) => {
  database
    .getController()
    .fetchAll()
    .then(data => {
      res.status(200).json({ data })
      socket.getIO().getIO().emit('success', data)
    })
    .catch(err => console.log('Failed to get bundle sizes'))
}

exports.analyzeBundleSizes = (req, res, next) => {
  const { nextSize, repo } = req.body

  database
    .getController()
    .fetch(repo)
    .then(async (prevModel: bundleDetailsModel[]) => {
      const [prevSize] = prevModel

      if (prevModel.length) {
        const isAnalized = await saveIntoDatabase(prevSize, nextSize, repo)
        res.status(200).json({ status: isAnalized })
      } else {
        passDataIntoDB(nextSize, repo)
          .then(() => res.status(200).json({ status: true }))
      }
    })
    .catch(err => console.log('Failed to analyze bundle'))
}
