const getAllOpenReductions = require('../data/get-all-open-reductions')
const updateReductionStatusByIds = require('../data/update-reduction-status-by-ids')
const reductionStatus = require('../../constants/reduction-status')

module.exports.execute = function (task) {
  var idsMap = new Map()
  idsMap.set(reductionStatus.ACTIVE, [])
  idsMap.set(reductionStatus.SCHEDULED, [])
  idsMap.set(reductionStatus.DELETED, [])
  idsMap.set(reductionStatus.ARCHIVED, [])

  return getAllOpenReductions()
    .then(function (results) {
      results.forEach(function (reduction) {
        status = getReducitonStatus(reduction)
        ids = idsMap.get(status)
        ids.push(reduction.id)
        idsMap.set(status, ids)
      })

      var updateReductionsPromises = []
      for (var [status, ids] of idsMap) {
        updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
      }
      return Promise.all(updateReductionsPromises)
    })
}

var getReducitonStatus = function (reduction) {
  var status = reductionStatus.DELETED

  var currentTime = new Date().getTime()
  var reductionStartTime = reduction.reductionStartDate.getTime()
  var reductionEndTime = reduction.reductionEndDate.getTime()

  if (reductionStartTime < currentTime && reductionEndTime < currentTime) {
    status = reductionStatus.ARCHIVED
  } else if (reductionStartTime < currentTime && reductionEndTime > currentTime) {
    status = reductionStatus.ACTIVE
  } else if (reductionStartTime > currentTime && reductionEndTime > currentTime) {
    status = reductionStatus.SCHEDULED
  }

  return status
}
