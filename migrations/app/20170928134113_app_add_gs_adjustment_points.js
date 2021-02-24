exports.up = function (knex, promise) {
  const sql = 'ALTER TABLE app.workload_points_calculations ADD gs_adjustment_points DECIMAL (5,2) CONSTRAINT wpc_gs_adjustment_points_default DEFAULT 0'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  const sql = 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT wpc_gs_adjustment_points_default;' +
   'ALTER TABLE app.workload_points_calculations DROP COLUMN gs_adjustment_points;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
