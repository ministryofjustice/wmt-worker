const logger = require('./log')
const updateReductionStatusByIds = require('./data/update-reduction-status-by-ids')
const updateAdjustmentStatusByIds = require('./data/update-adjustment-status-by-ids')
const status = require('../constants/reduction-status')

module.exports.updateReductionStatuses = function (reductions) {
  const statusMap = buildStatusMap(reductions)

  const updateReductionsPromises = []
  for (const [status, ids] of statusMap) {
    if (ids.length !== 0) {
      logger.info('Updating status to ' + status + ' for reductions with id in ' + ids)
      updateReductionsPromises.push(updateReductionStatusByIds(ids, status))
    }
  }
  return Promise.all(updateReductionsPromises)
}

module.exports.updateAdjustmentStatuses = function (adjustments) {
  const statusMap = buildStatusMap(adjustments)

  const updateAdjustmentsPromises = []
  for (const [status, ids] of statusMap) {
    if (ids.length > 0) {
      logger.info('Updating status to ' + status + ' for adjustments with id in ' + ids + '.')
      updateAdjustmentsPromises.push(updateAdjustmentStatusByIds(ids, status))
    }
  }
  return Promise.all(updateAdjustmentsPromises)
}

const buildStatusMap = function (records) {
  const idsMap = new Map()
  idsMap.set(status.ACTIVE, [])
  idsMap.set(status.SCHEDULED, [])
  idsMap.set(status.DELETED, [])
  idsMap.set(status.ARCHIVED, [])

  records.forEach(function (record) {
    const currentStatus = getCurrentStatus(record)
    if (currentStatus !== record.status) {
      const ids = idsMap.get(currentStatus)
      ids.push(record.id)
      idsMap.set(currentStatus, ids)
    }
  })
  return idsMap
}

const getCurrentStatus = function (record) {
  let currentStatus = status.ARCHIVED

  const currentTime = new Date().getTime()
  const startTime = record.effectiveFrom.getTime()
  const endTime = record.effectiveTo.getTime()

  if (startTime < currentTime && endTime > currentTime) {
    currentStatus = status.ACTIVE
  } else if (startTime > currentTime && endTime > currentTime) {
    currentStatus = status.SCHEDULED
  }
  return currentStatus
}
