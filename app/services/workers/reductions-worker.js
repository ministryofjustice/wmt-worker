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

const reductionsMapper = require('../staging-reductions-mapper')
const getAppCmsAndGsReductions = require('../data/get-app-cms-and-gs-reductions')
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
  return reductionsMapper.mapCmsReductions()
  .then(function (extractedCmsStgReductions) {
    return reductionsMapper.mapGsReductions()
    .then(function (extractedGsStgReductions) {
      var extractedStgReductions = []
      extractedStgReductions = extractedCmsStgReductions.concat(extractedGsStgReductions)

      var extractedStgReductionContactIds = []
      extractedStgReductions.forEach(function (extractedStgReduction) {
        extractedStgReductionContactIds.push(Number(extractedStgReduction.contactId))
      })

      return getAppCmsAndGsReductions()
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
            // Set date of this reduction to today at 00:00 in order to set as archived in next stage of worker
            updateReductionsEffectiveTo.push(updateReductionEffectiveTo(appReduction.id, updateTime))
          } else {
            // Check if the workload owner id has changed in the OM reduction for CMS reductions (OM reduction is the negative reduction)
            if (appReduction.hours < 0) {
              extractedCmsStgReductions.forEach(function (extractedCmsStgReduction) {
                if (hasOmReductionMoved(appReduction, extractedCmsStgReduction)) {
                  // Close old one and create new reduction for new OM
                  updateReductionsEffectiveTo.push(
                    updateReductionEffectiveTo(appReduction.id, updateTime)
                  )
                  insertReductions.push(insertReduction(extractedCmsStgReduction))
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
