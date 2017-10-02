const getOpenReductions = require('../data/get-all-open-reductions')
const updateReductionStatusByIds = require('../data/update-reduction-status-by-ids')
const reductionStatus = require('../../constants/reduction-status')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const logger = require('../log')

module.exports.execute = function (task) {
  var idsMap = new Map()
  idsMap.set(reductionStatus.ACTIVE, [])
  idsMap.set(reductionStatus.SCHEDULED, [])
  idsMap.set(reductionStatus.DELETED, [])
  idsMap.set(reductionStatus.ARCHIVED, [])

  var workloadIdStart = task.additionalData.workloadBatch.startingId
  var workloadIdEnd = workloadIdStart + task.additionalData.workloadBatch.batchSize - 1

  logger.info('Retrieving open reductions')
  return getOpenReductions(workloadIdStart, workloadIdEnd)
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
        logger.info('Updating status to ' + status + ' for reductions with id in ' + ids + '.')
        updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
      }

      return Promise.all(updateReductionsPromises)
      .then(function () {
        logger.info('Reduction statuses updated')

        var processAdjustments = new Task(
          undefined,
          submittingAgent.WORKER,
          taskType.PROCESS_ADJUSTMENTS,
          task.additionalData,
          task.workloadReportId,
          undefined,
          undefined,
          taskStatus.PENDING
          )

        return createNewTasks([processAdjustments])
        .then(function () {
          logger.info('Procee adjustments task created')
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
