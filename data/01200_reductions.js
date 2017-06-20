var tableName = 'reductions'

exports.seed = function (knex, Promise) {
  return knex(tableName).del()
    .then(function () {
      return knex('workload_owner').select('id').first()
    })
    .then(function (workloadOwnerId) {
      var effectiveFromDate = new Date()
      var effectiveToDate = new Date()

      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
      effectiveToDate.setDate(effectiveToDate.getDate() - 363)

      return knex(tableName).insert([
        { workload_owner_id: workloadOwnerId.id, effective_from: effectiveFromDate, effective_to: effectiveToDate, hours: Math.floor(Math.random() * 25) + 30 }
      ])
    })
}
