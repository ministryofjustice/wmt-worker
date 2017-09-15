const getAllOpenReductions = require('../data/get-all-open-reductions')
const updateReductionStatusByIds = require('../data/update-reduction-status-by-ids')
const reductionStatus = require('../../constants/reduction-status')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const logger = require('../log')

const mapStagingCmsReductions = require('../map-staging-cms-reductions')
const getAppCmsReductions = require('../data/get-app-cms-reductions')
const updateReductionEffectiveTo = require('../data/update-reduction-effective-to')
const insertReduction = require('../data/insert-reduction')

module.exports.execute = function (task) {
  return processCmsReductions()
  .then(function () {
    return updateReductionsStatus()
    .then(function () {
      logger.info('Reduction statuses updated')
      var calculateWorkloadPointsTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.CALCULATE_WORKLOAD_POINTS,
        task.additionalData,
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
  return mapStagingCmsReductions()
  .then(function (stgReductions) {
    var stgReductionContactIds = []
    stgReductions.forEach(function (stgReduction) {
      stgReductionContactIds.push(stgReduction.contactId)
    })

    return getAppCmsReductions()
    .then(function (appReductions) {
      var appReductionContactIds = []
      appReductions.forEach(function (appReduction) {
        appReductionContactIds.push(appReduction.contactId)
      })

      var updateReductionsEffectiveTo = []
      var insertReductions = []

      appReductions.forEach(function (appReduction) {
        if (!stgReductionContactIds.includes(appReduction.contactId)) {
          // set date of this reduction to today at 00.00 in order to set as archived in next stage of worker
          updateReductionsEffectiveTo.push(updateReductionEffectiveTo(appReduction.id, new Date().setHours(0, 0, 0, 0)))
        } else {
          // Check if the woid has changed in the om reduction
          if (appReduction.hours < 0) {
            stgReductions.forEach(function (stgReduction) {
              if (hasOmReductionMoved(appReduction, stgReduction)) {
                // close old one and create new reduction for new om
                updateReductionsEffectiveTo.push(
                  updateReductionEffectiveTo(appReduction.id, new Date().setHours(0, 0, 0, 0))
                )
                insertReductions.push(insertReduction(stgReduction))
              }
            })
          }
        }
      })

      return Promise.all(updateReductionsEffectiveTo)
      .then(function () {
        stgReductions.forEach(function (stgReduction) {
          if (!appReductionContactIds.includes(stgReduction.contactId)) {
            insertReductions.push(insertReduction(stgReduction))
          }
        })

        return Promise.all(insertReductions)
      })
    })
  })
}

var hasOmReductionMoved = function (appReduction, stgReduction) {
  return (stgReduction.contactId === appReduction.contactId &&
  stgReduction.hours < 0 &&
  stgReduction.workloadOwnerId !== appReduction.workloadOwnerId)
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
