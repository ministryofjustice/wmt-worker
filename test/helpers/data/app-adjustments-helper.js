const knex = require('../../../knex').appSchema

const adjustmentStatus = require('../../../app/constants/adjustment-status')
const helper = require('./app-workload-helper')

const CMS_ADJUSTMENT_REASON_ID = 1

module.exports.insertDependencies = function (inserts = []) {
  const promise = helper.insertDependencies(inserts)
    .then(function () {
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const adjustments = module.exports.getAdjustmentObjects(workloadOwnerId)
      return knex('adjustments').withSchema('app').returning('id').insert(adjustments)
    }).then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'adjustments', id })
      })
      return inserts
    })

  return promise
}

module.exports.getAllAdjustments = function () {
  return knex('adjustments').withSchema('app').select()
}

module.exports.getAdjustmentObjects = function (workloadOwnerId) {
  const effectiveFrom = new Date(new Date().setDate(new Date().getDate() - 20))
  const effectiveTo = new Date(new Date().setDate(new Date().getDate() + 20))

  return [
    // CMS
    { workload_owner_id: workloadOwnerId, points: 7, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: CMS_ADJUSTMENT_REASON_ID, status: null, contact_id: 123 },
    { workload_owner_id: workloadOwnerId, points: 9, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: CMS_ADJUSTMENT_REASON_ID, status: adjustmentStatus.ACTIVE, contact_id: 321 },
    { workload_owner_id: workloadOwnerId, points: 4, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: CMS_ADJUSTMENT_REASON_ID, status: adjustmentStatus.SCHEDULED, contact_id: null },
    { workload_owner_id: workloadOwnerId, points: 5, effective_from: effectiveFrom, effective_to: effectiveTo, adjustment_reason_id: CMS_ADJUSTMENT_REASON_ID, status: adjustmentStatus.ARCHIVED, contact_id: 312 }
  ]
}
