const logger = require('../log')

const Task = require('../domain/task')
const Batch = require('../domain/batch')

const getMissingStagingIds = require('../data/get-missing-staging-ids')
const getMostRecentWorkloadReport = require('../data/get-most-recent-workload-report')
const createNewTasks = require('../data/create-tasks')

const taskStatus = require('../../constants/task-status')
const taskType = require('../../constants/task-type')
const submittingAgent = require('../../constants/task-submitting-agent')

module.exports.execute = function (task) {
  const batchSize = 1
  var tasks = []
  var workloadReportId

  return getMostRecentWorkloadReport()
    .then(function (id) {
      workloadReportId = id[0].id
      return getMissingStagingIds()
        .then(function (stagingIds) {
          if (stagingIds.length !== 0 && stagingIds !== null && stagingIds !== undefined) {
            tasks = createTaskObjects(stagingIds, workloadReportId, batchSize)
            createNewTasks(tasks)
          } else {
            logger.info('CREATE-TASKS-FOR-MISSING - No Missing Offender Managers Found')
          }
        })
    }).catch(function (error) {
      logger.error('CREATE-TASKS-FOR-MISSING - Unable to Create Workload Tasks')
      logger.error(error)
      throw (error)
    })
}

var createTaskObjects = function (ids, workloadReportId, batchSize) {
  var tasks = []
  ids.forEach(function (id) {
    var additionalData = new Batch(id.id, batchSize)
    var taskToWrite = new Task(
      undefined,
      submittingAgent.WORKER,
      taskType.CREATE_WORKLOAD,
      additionalData,
      workloadReportId,
      undefined,
      undefined,
      taskStatus.PENDING
    )
    tasks.push(taskToWrite)
  })
  return tasks
}
