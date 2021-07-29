const logger = require('../log')
const getDivisionsDisplayedCount = require('../data/get-divisions-displayed-count')
const EXPECTED_DIVISION_COUNT = require('../../../config').EXPECTED_DIVISIONS_COUNT
const createTasks = require('../data/create-tasks')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const taskStatus = require('../../constants/task-status')
const taskType = require('../../constants/task-type')

module.exports.execute = function (task) {
  return getDivisionsDisplayedCount()
    .then(function (results) {
      if (results[0].divisionCount !== parseInt(EXPECTED_DIVISION_COUNT)) {
        logger.error('ERROR: Check For Missing Divisions - Missing Divisions Found. Expected ' + EXPECTED_DIVISION_COUNT + ' but found ' + results[0].divisionCount)
      }

      const processImportTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.GENERATE_DASHBOARD,
        undefined,
        undefined,
        undefined,
        undefined,
        taskStatus.PENDING
      )
      return createTasks([processImportTask])
    })
}
