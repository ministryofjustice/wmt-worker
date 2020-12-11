const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise

const helper = require('./app-workload-helper')
const reductionStatus = require('../../../app/constants/reduction-status')

module.exports.insertDependencies = function (workloadOwnerId, inserts = []) {
  const promise = helper.insertDependencies(inserts)
    .then(function (idsArray) {
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const reductions = module.exports.getReductionObjects(workloadOwnerId)
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

module.exports.getReductionObjects = function (workloadOwnerId) {
  const effectiveFrom = new Date(new Date().setDate(new Date().getDate() - 20))
  const effectiveTo = new Date(new Date().setDate(new Date().getDate() + 20))

  return [
    { workload_owner_id: workloadOwnerId, hours: 7, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: null },
    { workload_owner_id: workloadOwnerId, hours: 12, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.DELETED },
    { workload_owner_id: workloadOwnerId, hours: 9, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ACTIVE },
    { workload_owner_id: workloadOwnerId, hours: 4, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.SCHEDULED },
    { workload_owner_id: workloadOwnerId, hours: 5, effective_from: effectiveFrom, effective_to: effectiveTo, reduction_reason_id: 1, status: reductionStatus.ARCHIVED }
  ]
}
