const MAX_BUNDLE_SIZE_LIMIT = 10

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

exports.isBuildSmallerThanPrevious = isBuildSmallerThanPrevious
