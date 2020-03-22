export {}
const glob = require('glob');
const fs = require("fs")
const MAX_BUNDLE_SIZE_LIMIT = 10

const getBundleSize = async (path) => {
  const sunc = glob.sync(`${path}/**/*.js`)
    .map(filename => {
      const stats = fs.statSync(filename)
      return stats["size"]
    })
    .reduce((sum, current) => { return sum + current }, 0)

  return Promise.resolve(sunc)
}

const isBuildSmallerThanPrevious = (prevSize, newSize) => {
  const decreaseValue = parseInt((newSize - prevSize).toFixed());
  const isSmallerThanLimit = () => {
    if (decreaseValue > 0) {
      return (decreaseValue / prevSize) * 100 <= MAX_BUNDLE_SIZE_LIMIT
    }

    return true
  }

  return isSmallerThanLimit()
}

exports.getBundleSize = getBundleSize
exports.isBuildSmallerThanPrevious = isBuildSmallerThanPrevious
