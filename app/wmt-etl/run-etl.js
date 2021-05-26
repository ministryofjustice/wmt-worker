const glob = require('glob')

const config = require('../../etl-config')

const cleanTables = require('./clean-tables')
const correctNumberOfFilesExist = require('./correct-number-of-files-exist')
const processFiles = require('./process-files')
const archiveExtractFiles = require('./archive-extract-files')

module.exports = function () {
  const extractFiles = glob.sync(config.IMPORT_FILE_DIR + '*.xlsx', {})
  console.log(config.IMPORT_FILE_DIR)
  if (!correctNumberOfFilesExist(extractFiles.length)) {
    throw new Error('Not all expected extract files are present')
  }

  return cleanTables()
    .then(function () {
      return processFiles(extractFiles)
        .then(function () {
          return archiveExtractFiles(extractFiles)
        })
    })
}
