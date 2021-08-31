module.exports = function (value, label) {
  if (value === undefined || typeof value !== 'number') {
    throw new Error(label + ' should be a number but was ' + value)
  }
}
