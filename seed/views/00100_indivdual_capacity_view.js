exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.individual_capacity_view
    WITH SCHEMABINDING 
    AS 
    SELECT 
      wr.effective_from
      , wpc.total_points
      , wpc.available_points
      , wpc.reduction_hours
      , w.workload_owner_id AS id
      , wr.id AS workload_report_id
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_individual_capacity_view
  ON app.individual_capacity_view (id, workload_report_id)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_capacity_view;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
