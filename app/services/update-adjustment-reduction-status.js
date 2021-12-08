const logger = require('./log')
const updateReductionStatusByIds = require('./data/update-reduction-status-by-ids')
const updateAdjustmentStatusByIds = require('./data/update-adjustment-status-by-ids')
const status = require('../constants/reduction-status')
const { auditReductionStatusChange } = require('./audit-service')
const moment = require('moment')

module.exports.updateReductionStatuses = function (reductions) {
  const statusMap = buildStatusMap(reductions)

  const updateReductionsPromises = []
  for (const [status, records] of statusMap) {
    if (records.length !== 0) {
      const ids = records.map((record) => record.id)
      logger.info('Updating status to ' + status + ' for reductions with id in ' + ids)
      updateReductionsPromises.push(updateReductionStatusByIds(ids, status).then(function () { return auditReductionStatusChange(records, status) }))
    }
  }
  return Promise.all(updateReductionsPromises)
}

module.exports.updateAdjustmentStatuses = function (adjustments) {
  const statusMap = buildStatusMap(adjustments)

  const updateAdjustmentsPromises = []
  for (const [status, records] of statusMap) {
    if (records.length !== 0) {
      const ids = records.map((record) => record.id)
      logger.info('Updating status to ' + status + ' for adjustments with id in ' + ids + '.')
      updateAdjustmentsPromises.push(updateAdjustmentStatusByIds(ids, status))
    }
  }
  return Promise.all(updateAdjustmentsPromises)
}

const buildStatusMap = function (records) {
  const newStatuses = new Map()
  newStatuses.set(status.ACTIVE, [])
  newStatuses.set(status.SCHEDULED, [])
  newStatuses.set(status.DELETED, [])
  newStatuses.set(status.ARCHIVED, [])

  records.forEach(function (record) {
    const currentStatus = getCurrentStatus(record)
    if (currentStatus !== record.status) {
      const toUpdate = newStatuses.get(currentStatus)
      toUpdate.push(record)
      newStatuses.set(currentStatus, toUpdate)
    }
  })
  return newStatuses
}

const getCurrentStatus = function (record) {
  let currentStatus = status.ARCHIVED

  const currentTime = moment()
  const startTime = moment(record.effectiveFrom)
  const endTime = moment(record.effectiveTo)

  if (startTime.isBefore(currentTime) && endTime.isAfter(currentTime)) {
    currentStatus = status.ACTIVE
  } else if (startTime.isAfter(currentTime) && endTime.isAfter(currentTime)) {
    currentStatus = status.SCHEDULED
  }
  return currentStatus
}
