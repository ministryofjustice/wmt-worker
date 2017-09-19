exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ADD cms_reduction_hours DECIMAL (5,2) CONSTRAINT wpc_cms_reduction_hours_default DEFAULT 0'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT wpc_cms_reduction_hours_default DROP COLUMN cms_reduction_hours'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}
