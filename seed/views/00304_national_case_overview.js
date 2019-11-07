exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.national_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS name
    , SUM(w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , r.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY r.id, r.description;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.national_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
    .raw('CREATE UNIQUE CLUSTERED INDEX idx_national_case_overview on app.national_case_overview (link_id)')
}
