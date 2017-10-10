const updateAdjustmentStatusByIds = require('../data/update-adjustment-status-by-ids')
const adjustmentStatus = require('../../constants/adjustment-status')
const adjustmentCategory = require('../../constants/adjustment-category')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const wpcOperationType = require('../../constants/calculate-workload-points-operation')
const logger = require('../log')

const stagingAdjustmentsMapper = require('../staging-adjustments-mapper')
const getAppAdjustmentsForBatch = require('../data/get-app-adjustments-for-batch')
const updateAdjustmentEffectiveTo = require('../data/update-adjustment-effective-to')
const insertAdjustment = require('../data/insert-adjustment')

module.exports.execute = function (task) {
  var workloadStagingIdStart = task.additionalData.startingId
  var workloadStagingIdEnd = workloadStagingIdStart + task.additionalData.batchSize - 1
  var workloadReportId = task.workloadReportId

  return processAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function () {
    return updateAdjustmentsStatus(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function () {
      var calculateWpAdditionalData = {
        workloadBatch: task.additionalData,
        operationType: wpcOperationType.INSERT
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
}

var getAdjustmentStatus = function (adjustment) {
  var status = adjustmentStatus.ARCHIVED

  var currentTime = new Date().getTime()
  var adjustmentStartTime = adjustment.effectiveFrom.getTime()
  var adjustmentEndTime = adjustment.effectiveTo.getTime()

  if (adjustmentStartTime < currentTime && adjustmentEndTime > currentTime) {
    status = adjustmentStatus.ACTIVE
  } else if (adjustmentStartTime > currentTime && adjustmentEndTime > currentTime) {
    status = adjustmentStatus.SCHEDULED
  }

  return status
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

var updateAdjustmentsStatus = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  var idsMap = new Map()
  idsMap.set(adjustmentStatus.ACTIVE, [])
  idsMap.set(adjustmentStatus.SCHEDULED, [])
  idsMap.set(adjustmentStatus.ARCHIVED, [])

  logger.info('Retrieving open adjustments for workload owners with workloads\' staging ids ' + workloadStagingIdStart + ' - ' + workloadStagingIdEnd + ', for workload report ' + workloadReportId)
  return getAppAdjustmentsForBatch(adjustmentCategory.CMS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function (adjustments) {
    adjustments.forEach(function (adjustment) {
      status = getAdjustmentStatus(adjustment)
      if (status !== adjustment.status) {
        ids = idsMap.get(status)
        ids.push(adjustment.id)
        idsMap.set(status, ids)
      }
    })

    var updateAdjustmentsPromises = []
    for (var [status, ids] of idsMap) {
      if (ids.length > 0) {
        logger.info('Updating status to ' + status + ' for adjustments with id in ' + ids + '.')
        updateAdjustmentsPromises.push(updateAdjustmentStatusByIds(ids, status))
      }
    }

    return Promise.all(updateAdjustmentsPromises)
  })
}
