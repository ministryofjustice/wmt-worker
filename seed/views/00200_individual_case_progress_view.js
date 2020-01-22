exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.individual_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      om.forename
    , om.surname
    , w.community_last_16_weeks AS community_last_16_weeks
    , w.license_last_16_weeks AS license_last_16_weeks
    , w.total_filtered_cases AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , wo.id AS id
    , COUNT_BIG(*) AS count
  FROM app.workload w
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.tiers tr ON tr.workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
  WHERE wr.effective_from IS NOT NULL
  AND wr.effective_to IS NULL
  GROUP BY
      om.forename
    , om.surname
    , wo.id
    , w.community_last_16_weeks
    , w.license_last_16_weeks
    , w.total_filtered_cases;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_individual_case_progress_view
  ON app.individual_case_progress_view (id)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_case_progress_view;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
