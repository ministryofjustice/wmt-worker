exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ADD gs_reduction_hours DECIMAL (5,2) CONSTRAINT wpc_gs_reduction_hours_default DEFAULT 0'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT wpc_gs_reduction_hours_default;' +
   'ALTER TABLE app.workload_points_calculations DROP COLUMN gs_reduction_hours;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}
