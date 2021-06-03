const Promise = require('bluebird').Promise
const fs = require('fs')

module.exports = function (extractFiles) {
  return Promise.each(extractFiles, function (file) {
    fs.unlinkSync(file)
  })
}
