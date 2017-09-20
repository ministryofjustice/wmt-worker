exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.individual_capacity_view 
    WITH SCHEMABINDING 
    AS 
    SELECT 
    wr.effective_from
    , wpc.total_points
    , wpc.available_points
    , wpc.reduction_hours
    , w.workload_owner_id AS id
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_capacity_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
