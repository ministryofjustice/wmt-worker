exports.up = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations DROP COLUMN effective_from;' +
    'ALTER TABLE app.workload_points_calculations DROP COLUMN effective_to'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ADD effective_from timestamp;' +
    'ALTER TABLE app.workload_points_calculations ADD effective_to timestamp;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
