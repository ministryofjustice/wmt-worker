const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const operationTypes = require('../../constants/calculation-tasks-operation-type')
const logger = require('../log')

const stagingAdjustmentsMapper = require('../staging-adjustments-mapper')
const insertAdjustment = require('../data/insert-adjustment')

module.exports.execute = async function (task) {
  const workloadStagingIdStart = task.additionalData.startingId
  const workloadStagingIdEnd = workloadStagingIdStart + task.additionalData.batchSize - 1
  const workloadReportId = task.workloadReportId

  return processAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function () {
      logger.info('Retrieving open adjustments for workload owners with workloads\' staging ids ' + workloadStagingIdStart + ' - ' + workloadStagingIdEnd + ', for workload report ' + workloadReportId)
      const calculateWpAdditionalData = {
        workloadBatch: task.additionalData,
        operationType: operationTypes.INSERT
      }

      const calculateWorkloadPointsTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.CALCULATE_WORKLOAD_POINTS,
        calculateWpAdditionalData,
        task.workloadReportId,
        undefined,
        undefined,
        taskStatus.AWAITING_DUPLICATE_CHECK
      )

      return createNewTasks([calculateWorkloadPointsTask])
        .then(function () {
          logger.info('Calculate Workload Task created')
        })
    })
}

const processAdjustments = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getAllStgAdjustmentsForBatch(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (stgAdjustments) {
      return Promise.all(stgAdjustments.map(function (stgAdjustment) {
        return insertAdjustment(stgAdjustment)
      }))
    })
}

const getAllStgAdjustmentsForBatch = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
}
