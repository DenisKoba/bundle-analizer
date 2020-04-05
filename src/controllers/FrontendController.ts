import { bundleDetailsModel } from '../types'
const { isBuildSmallerThanPrevious } = require('../helpers/bundle-size')
const database = require('../database/database')
const socket = require('../socket/socket')

module.exports = class FrontendController {
  private static passDataIntoDB(newSize, repoName) {
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

  private static saveIntoDatabase(prevSize, newSize, repoName) {
    if (isBuildSmallerThanPrevious(
      parseInt(prevSize.size),
      parseInt(newSize)
    )) {
      return FrontendController.passDataIntoDB(newSize, repoName)
    }

    socket.getIO().emit('fail', { status: 'failed' })
    return false
  }

  static saveBundleData(req, res, next) {
    const { prevSize, nextSize, repo } = req.body

    FrontendController.saveIntoDatabase(prevSize, nextSize, repo)
      .then(() => res.status(200).json({ status: 'success' }))
  }

  static getBundleSizes(req, res, next) {
    database
      .getController()
      .fetchAll()
      .then(data => {
        res.status(200).json({ data })
        socket.getIO().getIO().emit('success', data)
      })
      .catch(err => console.log('Failed to get bundle sizes'))
  }

  static analyzeBundleSizes(req, res, next) {
    const { nextSize, repo } = req.body

    database
      .getController()
      .fetchLast(repo)
      .then(async (prevModel: bundleDetailsModel[]) => {
        const [prevSize] = prevModel

        if (prevModel.length) {
          const isAnalized = await FrontendController.saveIntoDatabase(prevSize, nextSize, repo)
          res.status(200).json({ status: isAnalized })
        } else {
          FrontendController.passDataIntoDB(nextSize, repo)
            .then(() => res.status(200).json({ status: true }))
        }
      })
      .catch(err => console.log('Failed to analyze bundle'))
  }
}
