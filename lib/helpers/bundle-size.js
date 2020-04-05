var MAX_BUNDLE_SIZE_LIMIT = 10;
var isBuildSmallerThanPrevious = function (prevSize, newSize) {
    var decreaseValue = parseInt((newSize - prevSize).toFixed());
    if (decreaseValue > 0) {
        return (decreaseValue / prevSize) * 100 <= MAX_BUNDLE_SIZE_LIMIT;
    }
    return true;
};
exports.isBuildSmallerThanPrevious = isBuildSmallerThanPrevious;
//# sourceMappingURL=bundle-size.js.map