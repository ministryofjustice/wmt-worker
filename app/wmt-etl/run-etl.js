const cleanTables = require('./clean-tables')
const processFile = require('./process-file')
const createTasks = require('../services/data/create-tasks')
const Task = require('../services/domain/task')
const submittingAgent = require('../constants/task-submitting-agent')
const taskStatus = require('../constants/task-status')
const taskType = require('../constants/task-type')
const log = require('../services/log')

const deleteFileTags = require('./delete-file-tags')
const { S3 } = require('../../etl-config')

module.exports = function () {
  return cleanTables()
    .then(function () {
      return processFile(S3.FILE_TO_PROCESS)
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
          return deleteFileTags(S3.FILE_TO_PROCESS)
            .then(function () {
              throw (error)
            })
        })
    })
    .catch(function (error) {
      log.error(error)
      throw (error)
    })
}
