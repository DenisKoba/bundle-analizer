export {}

const {
  MAX_BUNDLE_SIZE_LIMIT_MOBILE,
  MAX_BUNDLE_SIZE_LIMIT_PRIMEDATE,
  MAX_BUNDLE_SIZE_LIMIT_FRONTEND,
  MAX_BUNDLE_SIZE_LIMIT_LMS,
  MOBILE,
  PRIMEDATE,
  FRONTEND,
  LMS
} = require('../consts')


const maxBundleSizeLimit = (repoName) => {
  switch (repoName) {
    case MOBILE:
      return MAX_BUNDLE_SIZE_LIMIT_MOBILE
    case PRIMEDATE:
      return MAX_BUNDLE_SIZE_LIMIT_PRIMEDATE
    case FRONTEND:
      return MAX_BUNDLE_SIZE_LIMIT_FRONTEND
    case LMS:
      return MAX_BUNDLE_SIZE_LIMIT_LMS
    default:
      return MAX_BUNDLE_SIZE_LIMIT_MOBILE
  }
}

const isBuildSmallerThanPrevious = (prevSize, newSize, repoName) => {
  const decreaseValue = parseInt((newSize - prevSize).toFixed());

  if (decreaseValue > 0) {
    return (decreaseValue / prevSize) * 100 <= maxBundleSizeLimit(repoName)
  }

  return true
}

exports.isBuildSmallerThanPrevious = isBuildSmallerThanPrevious
