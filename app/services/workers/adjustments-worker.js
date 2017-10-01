const getAllOpenReductions = require('../data/get-all-open-reductions')
const updateReductionStatusByIds = require('../data/update-reduction-status-by-ids')
const reductionStatus = require('../../constants/reduction-status')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const wpcOperationType = require('../../constants/calculate-workload-points-operation')
const logger = require('../log')

const mapStagingCmsAdjustments = require('../map-staging-cms-adjustments')
const getCmsAdjustments = require('../data/get-adjustments')
const updateReductionEffectiveTo = require('../data/update-reduction-effective-to')
const insertReduction = require('../data/insert-reduction')

module.exports.execute = function (task) {
  return processCmsReductions()
  .then(function () {
    return updateReductionsStatus()
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
        logger.info('CalculateWorkload Task created')
      })
    })
  })
}

var getReductionStatus = function (reduction) {
  var status = reductionStatus.DELETED

  var currentTime = new Date().getTime()
  var reductionStartTime = reduction.effectiveFrom.getTime()
  var reductionEndTime = reduction.effectiveTo.getTime()

  if (reductionStartTime < currentTime && reductionEndTime < currentTime) {
    status = reductionStatus.ARCHIVED
  } else if (reductionStartTime < currentTime && reductionEndTime > currentTime) {
    status = reductionStatus.ACTIVE
  } else if (reductionStartTime > currentTime && reductionEndTime > currentTime) {
    status = reductionStatus.SCHEDULED
  }

  return status
}

var processCmsReductions = function () {
  return mapStagingCmsAdjustments()
  .then(function (extractedStgReductions) {
    var extractedStgReductionContactIds = []
    extractedStgReductions.forEach(function (extractedStgReduction) {
      extractedStgReductionContactIds.push(Number(extractedStgReduction.contactId))
    })

    return getCmsAdjustments()
    .then(function (appReductions) {
      var appReductionContactIds = []
      appReductions.forEach(function (appReduction) {
        appReductionContactIds.push(appReduction.contactId)
      })

      var updateReductionsEffectiveTo = []
      var insertReductions = []

      var updateTime = new Date()
      updateTime.setHours(0, 0, 0, 0)

      appReductions.forEach(function (appReduction) {
        if (!extractedStgReductionContactIds.includes(appReduction.contactId)) {
          // set date of this reduction to today at 00.00 in order to set as archived in next stage of worker
          updateReductionsEffectiveTo.push(updateReductionEffectiveTo(appReduction.id, updateTime))
        } else {
          // Check if the workload ower id has changed in the om reduction (om reduction is the negative reduction)
          if (appReduction.hours < 0) {
            extractedStgReductions.forEach(function (extractedStgReduction) {
              if (hasOmReductionMoved(appReduction, extractedStgReduction)) {
                // close old one and create new reduction for new om
                updateReductionsEffectiveTo.push(
                  updateReductionEffectiveTo(appReduction.id, updateTime)
                )
                insertReductions.push(insertReduction(extractedStgReduction))
              }
            })
          }
        }
      })

      return Promise.all(updateReductionsEffectiveTo)
      .then(function () {
        extractedStgReductions.forEach(function (extractedStgReduction) {
          if (!appReductionContactIds.includes(Number(extractedStgReduction.contactId))) {
            insertReductions.push(insertReduction(extractedStgReduction))
          }
        })

        return Promise.all(insertReductions)
      })
    })
  })
}

var hasOmReductionMoved = function (appReduction, extractedStgReduction) {
  return (extractedStgReduction.contactId === appReduction.contactId &&
    extractedStgReduction.hours < 0 &&
    extractedStgReduction.workloadOwnerId !== appReduction.workloadOwnerId)
}

var updateReductionsStatus = function () {
  var idsMap = new Map()
  idsMap.set(reductionStatus.ACTIVE, [])
  idsMap.set(reductionStatus.SCHEDULED, [])
  idsMap.set(reductionStatus.DELETED, [])
  idsMap.set(reductionStatus.ARCHIVED, [])

  logger.info('Retrieving open reductions')
  return getAllOpenReductions()
  .then(function (reductions) {
    reductions.forEach(function (reduction) {
      status = getReductionStatus(reduction)
      if (status !== reduction.status) {
        ids = idsMap.get(status)
        ids.push(reduction.id)
        idsMap.set(status, ids)
      }
    })

    var updateReductionsPromises = []
    for (var [status, ids] of idsMap) {
      if (ids.length > 0) {
        logger.info('Updating status to ' + status + ' for reductions with id in ' + ids + '.')
        updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
      }
    }

    return Promise.all(updateReductionsPromises)
  })
}
