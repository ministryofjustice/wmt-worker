exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.national_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      r.description AS name
    , SUM(w.community_last_16_weeks) AS community_last_16_weeks
    , SUM(w.license_last_16_weeks) AS license_last_16_weeks
    , SUM(w.total_cases) AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , COUNT_BIG(*) AS count
  FROM app.workload w
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.tiers tr ON tr.workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON l.id = t.ldu_id
    JOIN app.region r ON r.id = l.region_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY r.description;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_national_case_progress_view
  ON app.national_case_progress_view (name);`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.national_case_progress_view;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
