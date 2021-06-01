const moment = require('moment')
const tar = require('tar')
const config = require('../../etl-config')
const log = require('../services/log')
const getArchiveFileNames = require('./get-archive-filenames')
const createArchiveDirectory = require('./create-archive-directory')

module.exports = function (extractFiles) {
  const extractFileNames = getArchiveFileNames(extractFiles, config.IMPORT_FILE_DIR)
  const currentTimestamp = moment().format('YYYYMMDD-HHmmss')

  createArchiveDirectory(config.ARCHIVE_FILE_DIR)
  return tar.c({ gzip: true, cwd: config.IMPORT_FILE_DIR, file: config.ARCHIVE_FILE_DIR + config.ARCHIVE_FILE_NAME + currentTimestamp + '.tar.gz' }, extractFileNames)
    .then(function () {
      log.info('Archived input files to', config.ARCHIVE_FILE_DIR + config.ARCHIVE_FILE_NAME + currentTimestamp)
    })
}
