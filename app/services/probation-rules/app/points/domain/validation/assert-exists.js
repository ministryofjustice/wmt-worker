module.exports = function (data, label) {
  if (data === undefined || data === null || data === '') {
    throw new Error(label + ' should contain a value')
  }
}
