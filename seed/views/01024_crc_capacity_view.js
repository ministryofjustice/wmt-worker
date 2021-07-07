exports.seed = function (knex, Promise) {
  const sql = `CREATE VIEW app.crc_capacity_view
  WITH SCHEMABINDING 
  AS 
  SELECT SUM(total_points) AS total_points
    , SUM(available_points) AS available_points
    , SUM(reduction_hours) AS reduction_hours
    , SUM(wpc.contracted_hours) AS contracted_hours
    , wr.effective_from AS effective_from
    , wr.id AS workload_report_id
    , COUNT_BIG(*) AS count
 FROM app.workload_points_calculations AS wpc
    JOIN app.workload AS w ON wpc.workload_id = w.id
    JOIN app.workload_report AS wr ON wpc.workload_report_id = wr.id
    JOIN app.workload_owner AS wo ON wo.id = w.workload_owner_id
    JOIN app.team AS t ON t.id = wo.team_id
    JOIN app.ldu AS l ON l.id = t.ldu_id
    JOIN app.region AS r ON r.id = l.region_id
  WHERE r.description NOT LIKE 'NPS%'
  GROUP BY wr.effective_from, wr.id;`

  const index = 'CREATE UNIQUE CLUSTERED INDEX idx_crc_capacity_view ON app.crc_capacity_view (workload_report_id)'

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.crc_capacity_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
    .raw(index)
}
