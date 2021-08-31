module.exports = function (value = 0) {
  if (value === null) {
    value = 0
  }
  return parseInt(value, 10)
}
