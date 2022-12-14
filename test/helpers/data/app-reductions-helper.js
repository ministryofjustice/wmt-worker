const knex = require('../../../knex').appSchema

const helper = require('./app-workload-helper')
const reductionStatus = require('../../../app/constants/reduction-status')

module.exports.insertDependencies = function (inserts = []) {
  const promise = helper.insertDependencies(inserts)
    .then(function () {
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const reductions = module.exports.getReductionObjects(workloadOwnerId)
      return knex('reductions').withSchema('app').returning('id').insert(reductions)
    }).then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'reductions', id })
      })
      return inserts
    })

  return promise
}

module.exports.addReductionForWorkloadOwner = function (workloadOwnerId) {
  const inserts = []
  const reduction = { workload_owner_id: workloadOwnerId, hours: 7, effective_from: new Date(new Date().setDate(new Date().getDate() - 20)), effective_to: new Date(new Date().setDate(new Date().getDate() + 20)), reduction_reason_id: 1, status: null, notes: 'Some Notes' }
  return knex('reductions').withSchema('app').returning('id').insert(reduction)
    .then(function ([id]) {
      inserts.push({ table: 'reductions', id })
      return inserts
    })
}

module.exports.updateReductionReasonIsEnabled = function (reductionReasonId, isEnabled) {
  return knex('reduction_reason').withSchema('app').where('id', reductionReasonId).update({
    is_enabled: isEnabled
  })
}

module.exports.getReductionsForWorkloadOwnerId = function (workloadOwnerId) {
  return knex('reductions').withSchema('app').where('workload_owner_id', workloadOwnerId)
}

module.exports.getReductionsByIds = function (ids) {
  return knex('reductions').withSchema('app').whereIn('id', ids)
}

module.exports.getReductionObjects = function (workloadOwnerId) {
  const effectiveFrom = new Date(new Date().setDate(new Date().getDate() - 20))
  const effectiveTo = new Date(new Date().setDate(new Date().getDate() + 20))

  return [
    { workload_owner_id: workloadOwnerId, hours: 7, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: null, notes: 'Some Notes' },
    { workload_owner_id: workloadOwnerId, hours: 12, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.DELETED, notes: 'Some Notes' },
    { workload_owner_id: workloadOwnerId, hours: 9, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ACTIVE, notes: 'Some Notes' },
    { workload_owner_id: workloadOwnerId, hours: 4, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.SCHEDULED, notes: 'Some Notes' },
    { workload_owner_id: workloadOwnerId, hours: 5, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ARCHIVED, notes: 'Some Notes' }
  ]
}
