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
const updateCloseOpenWorkloadReports = require('../data/update-close-open-workload-reports')

const taskStatus = require('../../constants/task-status')
const taskType = require('../../constants/task-type')
const submittingAgent = require('../../constants/task-submitting-agent')
const calculateNumberOfRecordsToProcess = require('../helpers/calculate-number-of-records-to-process')
const calculateNumberOfTasksRequired = require('../helpers/calculate-number-of-tasks-required')

module.exports.execute = function () {
  const batchSize = parseInt(config.ASYNC_WORKER_BATCH_SIZE, 10)
  const tasks = []
  let workloadReportId
  return insertWorkloadReport()
    .then(function (insertedWorkloadReport) {
      workloadReportId = insertedWorkloadReport.id
      return updateCloseOpenWorkloadReports(insertedWorkloadReport.effective_from, workloadReportId).then(function () {
        return populateStagingCourtReporters()
      })
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

const populateStagingCourtReporters = function () {
  return getCourtReportsWithNoWorkloads()
    .then(function (courtReports) {
      return replaceCourtReporters(courtReports)
    })
}

const createAndGetCourtReportsTaskObjects = function (tasks, batchSize, workloadReportId) {
  return getCourtReportersIdRange().then(function (idRange) {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess(idRange)
    const courtReportsTasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)

    if (courtReportsTasksRequired > 0) {
      return createTaskObjects(tasks, taskType.CREATE_COURT_REPORTS, batchSize, idRange, workloadReportId)
    }
    return tasks
  })
}

const createAndGetWorkloadTaskObjects = function (tasks, batchSize, workloadReportId) {
  return getWmtExtractIdRange().then(function (idRange) {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess(idRange)
    const workloadTasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)

    if (workloadTasksRequired > 0) {
      return createTaskObjects(tasks, taskType.CREATE_WORKLOAD, batchSize, idRange, workloadReportId)
    }
    return tasks
  })
}

const createAndGetOmicTaskObjects = function (tasks, batchSize, workloadReportId) {
  return getOmicTeamsIdRange().then(function (idRange) {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess(idRange)
    const omicTasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)

    if (omicTasksRequired > 0) {
      return createTaskObjects(tasks, taskType.CREATE_OMIC_WORKLOAD, batchSize, idRange, workloadReportId)
    }
    return tasks
  })
}

const createTaskObjects = function (tasks, taskTypeToCreate, batchSize, idRange, workloadReportId) {
  const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess(idRange)
  const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)

  logger.info('Creating ' + tasksRequired + ' ' + taskTypeToCreate + ' tasks')

  let nextId = idRange.firstId
  for (let i = 0; i < tasksRequired; i++) {
    const additionalData = new Batch(nextId, batchSize)
    const taskToWrite = new Task(
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
