exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.omic_region_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      l.description AS name
    , SUM(w.total_cases) AS total_cases
    , SUM(wpc.licence_points) AS total_licence_points
    , SUM(wpc.custody_points) AS total_custody_points
    , r.id AS id
    , l.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.omic_workload w ON wo.id = w.workload_owner_id
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY l.id, l.description, r.id;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_region_case_overview ON app.omic_region_case_overview (link_id)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.omic_region_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
