export {}
const glob = require('glob');
const fs = require("fs")

const getBundleSize = async (path) => {
  const sunc = glob.sync(`${path}/**/*.js`)
    .map(filename => {
      const stats = fs.statSync(filename)
      return stats["size"]
    })
    .reduce((sum, current) => { return sum + current }, 0)

  return Promise.resolve(sunc)
}

const compareBundleSizes = (size) => {
  console.log(size)
}

exports.getBundleSize = getBundleSize
exports.compareBundleSizes = compareBundleSizes
