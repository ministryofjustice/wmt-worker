const fs = require('fs')

module.exports = function (archiveFileDirectory) {
  if (!fs.existsSync(archiveFileDirectory)) {
    fs.mkdirSync(archiveFileDirectory)
  }
}
