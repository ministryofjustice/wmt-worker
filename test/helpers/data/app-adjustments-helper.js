const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
var Promise = require('bluebird').Promise
const helper = require('./app-workload-helper')
const getAppAdjustmentsForBatch = require('../../../app/services/data/get-app-adjustments-for-batch')
const moment = require('moment')

module.exports.insertDependencies = function (workloadOwnerId, inserts = []) {
  var promise = helper.insertDependencies(inserts)
    .then(function (idsArray) {
      var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      var adjustments = getAdjustmentObjects(workloadOwnerId)
      return knex('adjustments').returning('id').insert(adjustments)
    }).then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'adjustments', id: id })
      })
      return inserts
    }).catch((error) => {
      console.error(error)
      exports.removeDependencies(inserts)
    })

  return promise
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

module.exports.getAdjustmentsForTest = function (adjustmentCategory, minWorkloadId, maxWorkloadId, workloadReportId) {
  return getAppAdjustmentsForBatch(adjustmentCategory, minWorkloadId, maxWorkloadId, workloadReportId)
  .then(function (results) {
    var formattedResults = []
    results.forEach(function (adjustment) {
      formattedResults.push({
        id: adjustment.id,
        workloadOwnerId: adjustment.workloadOwnerId,
        contactId: adjustment.contactId,
        points: adjustment.points,
        adjustmentReasonId: adjustment.adjustmentReasonId,
        effectiveFrom: moment(adjustment.effectiveFrom).format('YYYY-MM-DDTHH:mm:ss'),
        effectiveTo: moment(adjustment.effectiveFrom).format('YYYY-MM-DDTHH:mm:ss'),
        status: adjustment.status
      })
    })
    return formattedResults
  })
}

function getAdjustmentObjects (workloadOwnerId) {
  var effectiveFrom = new Date(new Date().setDate(new Date().getDate() - 20))
  var effectiveTo = new Date(new Date().setDate(new Date().getDate() + 20))

  return [
    // CMS
    {workload_owner_id: workloadOwnerId, points: 7, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 1, status: null, contact_id: 123},
    {workload_owner_id: workloadOwnerId, points: 9, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 1, status: 'ACTIVE', contact_id: 321},
    {workload_owner_id: workloadOwnerId, points: 4, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 1, status: 'SCHEDULED', contact_id: null},
    {workload_owner_id: workloadOwnerId, points: 5, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 1, status: 'ARCHIVED', contact_id: 312},
    // GS
    {workload_owner_id: workloadOwnerId, points: 7, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 40, status: null, contact_id: 222},
    {workload_owner_id: workloadOwnerId, points: 9, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 40, status: 'ACTIVE', contact_id: 333},
    {workload_owner_id: workloadOwnerId, points: 4, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 40, status: 'SCHEDULED', contact_id: null},
    {workload_owner_id: workloadOwnerId, points: 5, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: 40, status: 'ARCHIVED', contact_id: 444}
  ]
}
