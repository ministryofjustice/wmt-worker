const getAllOpenAdjustments = require('../data/get-all-open-adjustments')
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

const mapStagingCmsAdjustments = require('../map-staging-cms-adjustments')
const getAdjustments = require('../data/get-adjustments')
const updateAdjustmentEffectiveTo = require('../data/update-adjustment-effective-to')
const insertAdjustment = require('../data/insert-adjustment')

module.exports.execute = function (task) {
  return processAdjustments()
  .then(function () {
    return updateAdjustmentsStatus()
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

var processAdjustments = function () {
  return mapStagingCmsAdjustments()
  .then(function (extractedStgAdjustments) {
    var extractedStgAdjustmentContactIds = []
    extractedStgAdjustments.forEach(function (extractedStgAdjustment) {
      extractedStgAdjustmentContactIds.push(Number(extractedStgAdjustment.contactId))
    })

    return getAdjustments(adjustmentCategory.CMS)
    .then(function (cmsAdjustments) {
      var cmsAdjustmentContactIds = []
      cmsAdjustments.forEach(function (cmsAdjustment) {
        cmsAdjustmentContactIds.push(cmsAdjustment.contactId)
      })

      var updateAdjustmentsEffectiveTo = []
      var insertAdjustments = []

      var updateTime = new Date()
      updateTime.setHours(0, 0, 0, 0)

      cmsAdjustments.forEach(function (cmsAdjustment) {
        if (!extractedStgAdjustmentContactIds.includes(cmsAdjustment.contactId)) {
          // set date of this adjustment to today at 00.00 in order to set as archived in next stage of worker
          updateAdjustmentsEffectiveTo.push(updateAdjustmentEffectiveTo(cmsAdjustment.id, updateTime))
        } else {
          // Check if the workload ower id has changed in the om adjustment (om adjustment is the negative adjustment)
          if (cmsAdjustment.points < 0) {
            extractedStgAdjustments.forEach(function (extractedStgAdjustment) {
              if (hasOmAdjustmentMoved(cmsAdjustment, extractedStgAdjustment)) {
                // close old one and create new adjustment for new om
                updateAdjustmentsEffectiveTo.push(
                  updateAdjustmentEffectiveTo(cmsAdjustment.id, updateTime)
                )
                insertAdjustments.push(insertAdjustment(extractedStgAdjustment))
              }
            })
          }
        }
      })

      return Promise.all(updateAdjustmentsEffectiveTo)
      .then(function () {
        extractedStgAdjustments.forEach(function (extractedStgAdjustment) {
          if (!cmsAdjustmentContactIds.includes(Number(extractedStgAdjustment.contactId))) {
            insertAdjustments.push(insertAdjustment(extractedStgAdjustment))
          }
        })

        return Promise.all(insertAdjustments)
      })
    })
  })
}

var hasOmAdjustmentMoved = function (appAdjustment, extractedStgAdjustment) {
  return (extractedStgAdjustment.contactId === appAdjustment.contactId &&
    extractedStgAdjustment.points < 0 &&
    extractedStgAdjustment.workloadOwnerId !== appAdjustment.workloadOwnerId)
}

var updateAdjustmentsStatus = function () {
  var idsMap = new Map()
  idsMap.set(adjustmentStatus.ACTIVE, [])
  idsMap.set(adjustmentStatus.SCHEDULED, [])
  idsMap.set(adjustmentStatus.ARCHIVED, [])

  logger.info('Retrieving open adjustments')
  return getAllOpenAdjustments()
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
