module.exports.calculatePercentage = function (value, total) {
  let result = 0

  if (total !== 0) {
    result = (value / total) * 100
  }
  return result
}
