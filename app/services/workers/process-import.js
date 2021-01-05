const config = require('../../../config')
const logger = require('../log')

const Task = require('../domain/task')
const Batch = require('../domain/batch')

const getCourtReportsWithNoWorkloads = require('../data/get-staging-court-reports-with-no-workloads')
const replaceCourtReporters = require('../data/replace-staging-court-reporters')
const getWmtExtractIdRange = require('../data/get-wmt-extract-id-range')
const getOmicTeamsIdRange = require('../data/get-omic-teams-id-range')
const getCourtReportersIdRange = require('../data/get-court-reporters-id-range')
const createNewTasks = require('../data/create-tasks')
const insertWorkloadReport = require('../data/insert-workload-report')

const taskStatus = require('../../constants/task-status')
const taskType = require('../../constants/task-type')
const submittingAgent = require('../../constants/task-submitting-agent')
const disableIndexing = require('../data/disable-indexing')

module.exports.execute = function (task) {
  const batchSize = parseInt(config.ASYNC_WORKER_BATCH_SIZE, 10)
  var tasks = []
  var workloadReportId

  return disableIndexing()
  .then(function () {
    return insertWorkloadReport()
  })
  .then(function (insertedWorkloadReportId) {
    workloadReportId = insertedWorkloadReportId
    return populateStagingCourtReporters()
  })
  .then(function () {
    return createAndGetCourtReportsTaskObjects(tasks, batchSize, workloadReportId)
  })
  .then(function (tasks) {
    return createAndGetWorkloadTaskObjects(tasks, batchSize, workloadReportId)
  })
  .then(function (tasks) {
    return createAndGetOmicTaskObjects(tasks, batchSize, workloadReportId)
  })
  .then(function (tasks) {
    if (tasks.length > 0) {
      return createNewTasks(tasks)
      .then(function () {
        logger.info('Tasks created')
      })
    }
  })
}

var populateStagingCourtReporters = function () {
  return getCourtReportsWithNoWorkloads()
  .then(function (courtReports) {
    return replaceCourtReporters(courtReports)
  })
}

var createAndGetCourtReportsTaskObjects = function (tasks, batchSize, workloadReportId) {
  return getCourtReportersIdRange().then(function (idRange) {
    var numberOfRecordsToProcess = idRange.lastId - idRange.firstId
    var courtReportsTasksRequired = Math.ceil(numberOfRecordsToProcess / batchSize)

    if (courtReportsTasksRequired > 0) {
      return createTaskObjects(tasks, taskType.CREATE_COURT_REPORTS, batchSize, idRange, workloadReportId)
    }
    return tasks
  })
}

var createAndGetWorkloadTaskObjects = function (tasks, batchSize, workloadReportId) {
  return getWmtExtractIdRange().then(function (idRange) {
    var numberOfRecordsToProcess = idRange.lastId - idRange.firstId
    var workloadTasksRequired = Math.ceil(numberOfRecordsToProcess / batchSize)

    if (workloadTasksRequired > 0) {
      return createTaskObjects(tasks, taskType.CREATE_WORKLOAD, batchSize, idRange, workloadReportId)
    }
    return tasks
  })
}

var createAndGetOmicTaskObjects = function (tasks, batchSize, workloadReportId) {
  return getOmicTeamsIdRange().then(function (idRange) {
    var numberOfRecordsToProcess = idRange.lastId - idRange.firstId
    var omicTasksRequired = Math.ceil(numberOfRecordsToProcess / batchSize)

    if (omicTasksRequired > 0) {
      return createTaskObjects(tasks, taskType.CREATE_OMIC_WORKLOAD, batchSize, idRange, workloadReportId)
    }
    return tasks
  })
}

var createTaskObjects = function (tasks, taskTypeToCreate, batchSize, idRange, workloadReportId) {
  var numberOfRecordsToProcess = idRange.lastId - idRange.firstId
  var tasksRequired = Math.ceil(numberOfRecordsToProcess / batchSize)

  logger.info('Creating ' + tasksRequired + ' ' + taskTypeToCreate + ' tasks')

  var nextId = idRange.firstId
  for (var i = 0; i < tasksRequired; i++) {
    var additionalData = new Batch(nextId, batchSize)
    var taskToWrite = new Task(
      undefined,
      submittingAgent.WORKER,
      taskTypeToCreate,
      additionalData,
      workloadReportId,
      undefined,
      undefined,
      taskStatus.PENDING
    )
    tasks.push(taskToWrite)
    nextId += batchSize
  }
  return tasks
}
