const logger = require('../log')
const checkForDuplicateWorkloads = require('../data/check-for-duplicate-workloads')
const checkForDuplicateCourtReports = require('../data/check-for-duplicate-court-reports')
const Task = require('../domain/task')
const createNewTasks = require('../data/create-tasks')
const submittingAgent = require('../../constants/task-submitting-agent')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')

module.exports.execute = async function (task) {
  return checkForDuplicateWorkloads()
    .then(function (duplicateWorkloads) {
      if (duplicateWorkloads && duplicateWorkloads.length) {
        logger.info('duplicates found: linkIds are')
        logger.info(duplicateWorkloads)
        throw new Error('Duplicates found where none expected')
      }
    })
    .then(function () {
      return checkForDuplicateCourtReports()
        .then(function (duplicateCourtReports) {
          if (duplicateCourtReports && duplicateCourtReports.length) {
            logger.info('duplicate court reports found: linkIds are')
            logger.info(duplicateCourtReports)
            throw new Error('Duplicate court reports found where none expected')
          }
        })
    })
    .then(function () {
      logger.info('REMOVE-DUPLICATES - Indexing Enabled')
      const checkForMissingDivisionsTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.CHECK_FOR_MISSING_DIVISIONS,
        undefined,
        task.workloadReportId,
        undefined,
        undefined,
        taskStatus.PENDING
      )
      return createNewTasks([checkForMissingDivisionsTask])
    })
    .catch(function (error) {
      logger.error('REMOVE-  - An error occurred removing duplicates')
      logger.error(error)
      throw (error)
    })
}
