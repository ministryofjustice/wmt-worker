const logger = require('./log')
const updateReductionStatusByIds = require('./data/update-reduction-status-by-ids')
const updateAdjustmentStatusByIds = require('./data/update-adjustment-status-by-ids')
const status = require('../constants/reduction-status')

module.exports.updateReductionStatuses = function (reductions) {
  var statusMap = buildStatusMap(reductions)

  var updateReductionsPromises = []
  for (var [status, ids] of statusMap) {
    if (ids.length !== 0) {
      logger.info('Updating status to ' + status + ' for reductions with id in ' + ids)
      updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
    }
  }
  return Promise.all(updateReductionsPromises)
}

module.exports.updateAdjustmentStatuses = function (adjustments) {
  var statusMap = buildStatusMap(adjustments)
  var chunkSize = 2000
  var updateAdjustmentsPromises = []
  for (var [status, ids] of statusMap) {
    if (ids.length > 0) {
      for (var i = 0; i < ids.length; i += chunkSize) {
        var idsChunk = ids.slice(i, Math.min(i + chunkSize, ids.length))
        logger.info('Updating status to ' + status + ' for adjustments with id in ' + idsChunk + '.')
        updateAdjustmentsPromises.push(updateAdjustmentStatusByIds(idsChunk, status))
      }
    }
  }
  return Promise.all(updateAdjustmentsPromises)
}

var buildStatusMap = function (records) {
  var idsMap = new Map()
  idsMap.set(status.ACTIVE, [])
  idsMap.set(status.SCHEDULED, [])
  idsMap.set(status.DELETED, [])
  idsMap.set(status.ARCHIVED, [])

  records.forEach(function (record) {
    var currentStatus = getCurrentStatus(record)
    if (currentStatus !== record.status) {
      var ids = idsMap.get(currentStatus)
      ids.push(record.id)
      idsMap.set(currentStatus, ids)
    }
  })
  return idsMap
}

var getCurrentStatus = function (record) {
  var currentStatus = status.ARCHIVED

  var currentTime = new Date().getTime()
  var startTime = record.effectiveFrom.getTime()
  var endTime = record.effectiveTo.getTime()

  if (startTime < currentTime && endTime > currentTime) {
    currentStatus = status.ACTIVE
  } else if (startTime > currentTime && endTime > currentTime) {
    currentStatus = status.SCHEDULED
  }
  return currentStatus
}
