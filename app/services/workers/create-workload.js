const Promise = require('bluebird').Promise
const logger = require('../log')
const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const getStagingWorkload = require('../data/get-staging-workload')
const calculateBaseWorkloadValues = require('wmt-probation-rules').CalculateBaseWorkloadValues
const createNewTasks = require('../data/create-tasks')

module.exports.execute = function (task) {
  return new Promise(function (resolve) {
    var nextId = task.additionalData.nextId
    var lastId = nextId + (task.additionalData.batchSize - 1)

    var workloadArray = []

    getStagingWorkload([nextId, lastId])
      .then(function (omWorkloadArray) {
        for (let omWorkload in omWorkloadArray) {
          workloadArray.push(calculateBaseWorkloadValues(omWorkload))
        }
      })

    var createWorkloadTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.CREATE_WORKLOAD,
        task.additionalData,
        undefined,
        undefined,
        taskStatus.PENDING
    )

    createNewTasks(createWorkloadTask)

    logger.info('Tasks created')
    resolve()
  })
}
