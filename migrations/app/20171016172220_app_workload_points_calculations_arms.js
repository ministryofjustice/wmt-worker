exports.up = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ADD arms_total_cases INT NOT NULL CONSTRAINT workload_points_calculations_arms_total_cases_default DEFAULT 0;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT workload_points_calculations_arms_total_cases_default;'
  sql += 'ALTER TABLE app.workload_points_calculations DROP COLUMN arms_total_cases;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}
