export {}
const MAX_BUNDLE_SIZE_LIMIT = 10

const isBuildSmallerThanPrevious = (prevSize, newSize) => {
  const decreaseValue = parseInt((newSize - prevSize).toFixed());

  if (decreaseValue > 0) {
    return (decreaseValue / prevSize) * 100 <= MAX_BUNDLE_SIZE_LIMIT
  }

  return true
}

exports.isBuildSmallerThanPrevious = isBuildSmallerThanPrevious
