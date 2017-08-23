var tableName = 'reductions'
var workloadOwnerId
var reductionReasonId

exports.seed = function (knex, Promise) {
  return knex(tableName).del()
    .then(function () {
      return knex('workload_owner').select('id').first()
    })
    .then(function (firstWorkloadOwnerId) {
      workloadOwnerId = firstWorkloadOwnerId.id
      return knex('reduction_reason').select('id').first()
    })
    .then(function (firstReductionReasonId) {
      reductionReasonId = firstReductionReasonId.id
      var effectiveFromDate = new Date()
      var effectiveToDate = new Date()

      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
      effectiveToDate.setDate(effectiveToDate.getDate() - 363)

      return knex(tableName).insert([
        { workload_owner_id: workloadOwnerId, reduction_reason_id: reductionReasonId, effective_from: effectiveFromDate, effective_to: effectiveToDate, hours: Math.floor(Math.random() * 6) + 1 }
      ])
    })
}
