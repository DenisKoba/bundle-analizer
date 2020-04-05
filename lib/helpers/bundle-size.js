"use strict";
const MAX_BUNDLE_SIZE_LIMIT = 10;
const isBuildSmallerThanPrevious = function (prevSize, newSize) {
  const decreaseValue = parseInt((newSize - prevSize).toFixed());
  const isSmallerThanLimit = function () {
    if (decreaseValue > 0) {
      return (decreaseValue / prevSize) * 100 <= MAX_BUNDLE_SIZE_LIMIT;
    }
    return true;
  };
  return isSmallerThanLimit();
};
exports.isBuildSmallerThanPrevious = isBuildSmallerThanPrevious;
//# sourceMappingURL=bundle-size.js.map