exports.up = function (knex, promise) {
  var sql = 'sp_rename \'app.reduction_reason.is_cms\', \'is_cms_or_gs\', \'COLUMN\''
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
