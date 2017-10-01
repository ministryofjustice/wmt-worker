exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations ADD cms_reduction_points INT CONSTRAINT wpc_cms_reduction_points_default DEFAULT 0'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload_points_calculations DROP CONSTRAINT wpc_cms_reduction_points_default;' +
   'ALTER TABLE app.workload_points_calculations DROP COLUMN cms_reduction_points;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}
