var tableName = 'workload_report'
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)
      var effectiveToDate = new Date(effectiveFromDate.getTime())

      // Inserts seed entries
      var entries = []

      for (var i = 0; i < 12; i++) {
        effectiveToDate.setDate(effectiveFromDate.getDate() + 30)
        entries.push({
          effective_from: new Date(effectiveFromDate.getTime()),
          effective_to: new Date(effectiveToDate.getTime())
        })
        effectiveFromDate = new Date(effectiveToDate.getTime())
      }

      entries[entries.length - 1].effective_to = undefined
      return knex(tableName).insert(entries)
    })
}
