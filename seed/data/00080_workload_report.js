var tableName = 'workload_report'
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      var effectiveFromDate = new Date()
      effectiveFromDate.setDate(effectiveFromDate.getDate() - 365)

      // Inserts seed entries
      let entries = []

      for (let i = 1; i <= 13; i++) {
        entries.push({effective_from: new Date(effectiveFromDate.getTime())})
        effectiveFromDate.setDate(effectiveFromDate.getDate() + 30)
      }
      return knex(tableName).insert(entries)
    })
}
