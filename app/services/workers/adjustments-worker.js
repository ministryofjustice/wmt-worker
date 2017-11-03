const adjustmentCategory = require('../../constants/adjustment-category')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const operationTypes = require('../../constants/calculation-tasks-operation-type')
const logger = require('../log')

const stagingAdjustmentsMapper = require('../staging-adjustments-mapper')
const getAppAdjustmentsForBatch = require('../data/get-app-adjustments-for-batch')
const updateAdjustmentEffectiveTo = require('../data/update-adjustment-effective-to')
const insertAdjustment = require('../data/insert-adjustment')
const updateStatus = require('../update-adjustment-reduction-status')

module.exports.execute = function (task) {
  var workloadStagingIdStart = task.additionalData.startingId
  var workloadStagingIdEnd = workloadStagingIdStart + task.additionalData.batchSize - 1
  var workloadReportId = task.workloadReportId

  return processAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function () {
    logger.info('Retrieving open adjustments for workload owners with workloads\' staging ids ' + workloadStagingIdStart + ' - ' + workloadStagingIdEnd + ', for workload report ' + workloadReportId)
    return getAppAdjustmentsForBatch(adjustmentCategory.CMS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (adjustments) {
      return updateStatus.updateAdjustmentStatuses(adjustments)
      .then(function () {
        logger.info('Adjustment statuses updated')
        var calculateWpAdditionalData = {
          workloadBatch: task.additionalData,
          operationType: operationTypes.INSERT
        }

        var calculateWorkloadPointsTask = new Task(
          undefined,
          submittingAgent.WORKER,
          taskType.CALCULATE_WORKLOAD_POINTS,
          calculateWpAdditionalData,
          task.workloadReportId,
          undefined,
          undefined,
          taskStatus.PENDING
        )

        return createNewTasks([calculateWorkloadPointsTask])
        .then(function () {
          logger.info('Calculate Workload Task created')
        })
      })
    })
  })
}

var processAdjustments = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getAllStgAdjustmentsForBatch(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function (stgAdjustments) {
    return getAllAppAdjustmentsForBatch(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (appAdjustments) {
      var updateAdjustmentsEffectiveTo = []
      var insertAdjustments = []

      var stgAdjustmentIds = []
      stgAdjustments.forEach(function (stgAdjustment) {
        stgAdjustmentIds.push(String(stgAdjustment.contactId) + ':' + String(stgAdjustment.workloadOwnerId))
      })

      var appAdjustmentIds = []
      appAdjustments.forEach(function (appAdjustment) {
        appAdjustmentIds.push(String(appAdjustment.contactId) + ':' + String(appAdjustment.workloadOwnerId))
      })

      var updateTime = new Date()
      updateTime.setHours(0, 0, 0, 0)

      appAdjustments.forEach(function (appAdjustment) {
        var appAdjustmentId = String(appAdjustment.contactId) + ':' + String(appAdjustment.workloadOwnerId)
        if (!stgAdjustmentIds.includes(appAdjustmentId)) {
          // set date of this adjustment to today at 00.00 in order to set as archived in next stage of worker
          updateAdjustmentsEffectiveTo.push(updateAdjustmentEffectiveTo(appAdjustment.id, updateTime))
        }
      })

      stgAdjustments.forEach(function (stgAdjustment) {
        var stgAdjustmentId = String(stgAdjustment.contactId) + ':' + String(stgAdjustment.workloadOwnerId)
        if (!appAdjustmentIds.includes(stgAdjustmentId)) {
          insertAdjustments.push(insertAdjustment(stgAdjustment))
        }
      })

      return Promise.all(updateAdjustmentsEffectiveTo)
      .then(function () {
        return Promise.all(insertAdjustments)
      })
    })
  })
}

var getAllStgAdjustmentsForBatch = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function (stgCmsAdjustments) {
    return stagingAdjustmentsMapper.mapGsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (stgGsAdjustments) {
      var stgAdjustments = []
      stgAdjustments = stgCmsAdjustments.concat(stgGsAdjustments)
      return stgAdjustments
    })
  })
}

var getAllAppAdjustmentsForBatch = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getAppAdjustmentsForBatch(adjustmentCategory.CMS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function (appCmsAdjustments) {
    return getAppAdjustmentsForBatch(adjustmentCategory.GS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (appGsAdjustments) {
      var appAdjustments = []
      appAdjustments = appCmsAdjustments.concat(appGsAdjustments)
      return appAdjustments
    })
  })
}
