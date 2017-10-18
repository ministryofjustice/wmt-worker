const logger = require('./log')
const updateReductionStatusByIds = require('./data/update-reduction-status-by-ids')
const reductionStatus = require('../constants/reduction-status')

var idsMap = new Map()
idsMap.set(reductionStatus.ACTIVE, [])
idsMap.set(reductionStatus.SCHEDULED, [])
idsMap.set(reductionStatus.DELETED, [])
idsMap.set(reductionStatus.ARCHIVED, [])

module.exports = function (reductions) {
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
    if (ids.length !== 0) {
      logger.info('Updating status to ' + status + ' for reductions with id in ' + ids)
      updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
    }
  }

  return Promise.all(updateReductionsPromises)
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
