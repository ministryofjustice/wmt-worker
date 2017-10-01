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

module.exports.execute = function (task) {
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
        logger.info('Updating status to ' + status + ' for reductions with id in ' + ids + '.')
        updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
      }

      return Promise.all(updateReductionsPromises)
      .then(function () {
        logger.info('Reduction statuses updated')

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
