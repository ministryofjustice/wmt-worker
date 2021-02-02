exports.seed = function (knex, Promise) {
  const view = `CREATE VIEW app.team_capacity_view
    WITH SCHEMABINDING
    AS
    SELECT SUM(total_points) AS total_points
      , SUM(available_points) AS available_points
      , SUM(reduction_hours) AS reduction_hours
      , SUM(wpc.contracted_hours) AS contracted_hours
      , wr.effective_from AS effective_from
      , wr.id AS workload_report_id
      , t.id AS id
      , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.team AS t ON wo.team_id = t.id
    GROUP BY t.id, wr.effective_from, wr.id;`

  const index = `CREATE UNIQUE CLUSTERED INDEX idx_team_capacity_view
  ON app.team_capacity_view (id, workload_report_id)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_capacity_view;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
