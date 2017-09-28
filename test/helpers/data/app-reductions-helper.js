const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
var Promise = require('bluebird').Promise

const helper = require('./app-workload-owner-helper')
const reductionContactType = require('../../../app/constants/reduction-contact-type')
const reductionStatus = require('../../../app/constants/reduction-status')

module.exports.insertDependencies = function (workloadOwnerId, inserts = []) {
  var promise = helper.insertDependencies(inserts)
    .then(function (idsArray) {
      var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      var reductions = getReductionObjects(workloadOwnerId)
      return knex('reductions').returning('id').insert(reductions)
    }).then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'reductions', id: id })
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

function getReductionObjects (workloadOwnerId) {
  var effectiveFrom = new Date(new Date().setDate(new Date().getDate() - 20))
  var effectiveTo = new Date(new Date().setDate(new Date().getDate() + 20))

  return [
    { workload_owner_id: workloadOwnerId, hours: 7, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: null, contact_id: 123, contact_type: reductionContactType.CMS },
    { workload_owner_id: workloadOwnerId, hours: 1, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ACTIVE, contact_id: 123, contact_type: reductionContactType.CMS },
    { workload_owner_id: workloadOwnerId, hours: 12, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.DELETED, contact_id: null, contact_type: null },
    { workload_owner_id: workloadOwnerId, hours: 9, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ACTIVE, contact_id: 321, contact_type: reductionContactType.CMS },
    { workload_owner_id: workloadOwnerId, hours: 4, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.SCHEDULED, contact_id: null, contact_type: null },
    { workload_owner_id: workloadOwnerId, hours: 5, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ACTIVE, contact_id: 312, contact_type: reductionContactType.GS }
  ]
}
