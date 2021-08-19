
const cleanTables = require('./clean-tables')
const processFiles = require('./process-files')
const createTasks = require('../services/data/create-tasks')
const Task = require('../services/domain/task')
const submittingAgent = require('../constants/task-submitting-agent')
const taskStatus = require('../constants/task-status')
const taskType = require('../constants/task-type')
const log = require('../services/log')
const listEtlFiles = require('./list-etl-files')
const deleteFileTags = require('./delete-file-tags')

module.exports = function () {
  return cleanTables()
    .then(function () {
      return listEtlFiles().then(function (extractFiles) {
        return processFiles(extractFiles)
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
          }).catch(function (error) {
            return deleteFileTags(extractFiles)
              .then(function () {
                throw (error)
              })
          })
      })
    })
    .catch(function (error) {
      log.error(error)
      throw (error)
    })
}
