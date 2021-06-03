const glob = require('glob')

const config = require('../../etl-config')

const cleanTables = require('./clean-tables')
const correctNumberOfFilesExist = require('./correct-number-of-files-exist')
const processFiles = require('./process-files')
const archiveExtractFiles = require('./archive-extract-files')
const deleteExtractFiles = require('./delete-extract-files')
const createTasks = require('../services/data/create-tasks')
const Task = require('../services/domain/task')
const submittingAgent = require('../constants/task-submitting-agent')
const taskStatus = require('../constants/task-status')
const taskType = require('../constants/task-type')
const log = require('../services/log')

module.exports = function () {
  const extractFiles = glob.sync(config.IMPORT_FILE_DIR + '*.xlsx', {})
  return cleanTables()
    .then(function () {
      if (!correctNumberOfFilesExist(extractFiles.length)) {
        throw new Error('Not all expected extract files are present')
      }
      return processFiles(extractFiles)
        .then(function () {
          return archiveExtractFiles(extractFiles)
            .then(function () {
              return deleteExtractFiles(extractFiles)
                .then(function () {
                  const processImportTask = new Task(
                    undefined,
                    submittingAgent.WORKER,
                    taskType.PROCESS_IMPORT,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    taskStatus.PENDING
                  )
                  return createTasks([processImportTask])
                })
            })
        })
    })
    .catch(function (error) {
      log.error(error)
      throw (error)
    })
}
