module.exports = function (idRange) {
  if (idRange) {
    if (idRange.firstId && idRange.lastId) {
      return ((idRange.lastId - idRange.firstId) + 1)
    } else {
      return 0
    }
  } else {
    return 0
  }
}
