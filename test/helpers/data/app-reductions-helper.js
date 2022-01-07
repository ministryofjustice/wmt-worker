const knex = require('../../../knex').appSchema

const helper = require('./app-workload-helper')
const reductionStatus = require('../../../app/constants/reduction-status')
const removeData = require('./remove-data')

module.exports.insertDependencies = function (inserts = []) {
  const promise = helper.insertDependencies(inserts)
    .then(function () {
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const reductions = module.exports.getReductionObjects(workloadOwnerId)
      return knex('reductions').withSchema('app').returning('id').insert(reductions)
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
  return removeData(inserts)
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
