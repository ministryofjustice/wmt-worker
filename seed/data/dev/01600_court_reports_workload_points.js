var tableName = 'court_reports_workload_points'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert({
        default_contracted_hours: 37
      })
    })
}
