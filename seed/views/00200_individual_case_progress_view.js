exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.individual_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      w.workload_owner_id AS workload_owner_id
    , w.community_last_16_weeks AS community_last_16_weeks
    , w.license_last_16_weeks AS license_last_16_weeks
    , w.total_cases AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , w.workload_owner_id AS id
    , COUNT_BIG(*) AS count
  FROM app.workload w
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.tiers tr ON tr.workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
  WHERE wr.effective_from IS NOT NULL
  AND wr.effective_to IS NULL
  GROUP BY
      w.workload_owner_id
    , w.community_last_16_weeks
    , w.license_last_16_weeks
    , w.total_cases;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_individual_case_progress_view
  ON app.individual_case_progress_view (id)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_case_progress_view;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
