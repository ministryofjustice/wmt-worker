const Promise = require('bluebird').Promise
const logger = require('../log')
const Task = require('../domain/task')
const Batch = require('../domain/batch')
const taskType = require('../../constants/task-type')

module.exports.execute = function (task) {

  // get ID range from additional data
  // call context mapping rules
  // create app schema entries
  // create new workload report task

  return new Promise(function (resolve) {
    var nextId = task.additionalData.nextId
    var numberOfRecordsToProcess = task.additionalData.batchSize
    var tasks = []

    //logger.info('Creating ' + tasksRequired + ' create workload tasks')

      for (let i = nextId; i < numberOfRecordsToProcess; i++) {

        // get staging record from DB using nextId
        // check if WorkloadOwner already exists in app schema; if does not, create
        // import staging extract to workload record/table?????
        // create workload report
        var taskToWrite = new Task(
            undefined,
            submittingAgent.WORKER,
            taskType.CREATE_WORKLOAD_REPORT,
            undefined,
            undefined,
            taskStatus.PENDING
         )
        tasks.push(taskToWrite)
        nextId += batchSize
        createNewTasks(tasks)
    }

    logger.info('Tasks created')
    resolve()
  })
}
