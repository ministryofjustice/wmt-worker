module.exports = function (value, label) {
  if (value === undefined || typeof value !== 'boolean') {
    throw new Error(label + ' should be a boolean')
  }
}
