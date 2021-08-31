module.exports = function (array, label) {
  if (array.length !== 8) {
    throw new Error(label + ' should contain 8 values')
  }
}
