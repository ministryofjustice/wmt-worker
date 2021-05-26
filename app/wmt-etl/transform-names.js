const cleanName = require('./clean-name')

module.exports = function (names) {
  // Map worksheet or column names to db staging table format
  return names.map(name => cleanName(name))
}
