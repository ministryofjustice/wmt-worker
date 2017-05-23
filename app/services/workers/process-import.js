const config = require('../../../config')

const Promise = require('bluebird').Promise
const Task = require('../domain/task')
const Batch = require('../domain/batch')

const logger = require('../log')
const getExtractIdRange = require('../data/get-wmt-extract-id-range')
const createNewTasks = require('../data/create-tasks')

const taskStatus = require('../../constants/task-status')
const taskType = require('../../constants/task-type')
const submittingAgent = require('../../constants/task-submitting-agent')

module.exports.execute = function (task) {
  const batchSize = parseInt(config.ASYNC_WORKER_BATCH_SIZE, 10)

  return new Promise(function (resolve) {
    var idRange = getExtractIdRange()
    var tasks = []
    var numberOfRecordsToProcess = idRange.lastId - idRange.firstId
    var tasksRequired = Math.ceil(numberOfRecordsToProcess / batchSize)

    logger.info('Creating ' + tasksRequired + ' create workload tasks')

    if (tasksRequired > 0) {
      var nextId = idRange.firstId

      for (let i = 0; i < tasksRequired; i++) {
        var additionalData = new Batch(nextId, batchSize)
        var taskToWrite = new Task(
            undefined,
            submittingAgent.WORKER,
            taskType.CREATE_WORKLOAD,
            additionalData,
            undefined,
            taskStatus.PENDING
         )
        tasks.push(taskToWrite)
        nextId += batchSize
        createNewTasks(tasks)
      }
    }

    logger.info('Tasks created')
    resolve()
  })
}
