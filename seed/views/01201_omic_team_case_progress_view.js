exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.omic_team_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT
      om.forename
    , om.surname
    , wo.id AS workload_owner_id
    , w.community_last_16_weeks AS community_last_16_weeks
    , w.license_last_16_weeks AS license_last_16_weeks
    , w.total_filtered_cases AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , t.id AS id
    , COUNT_BIG(*) AS count
  FROM app.omic_workload w
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.omic_tiers tr ON tr.omic_workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.team t ON wo.team_id = t.id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY
      om.forename
    , om.surname
    , wo.id
    , t.id
    , w.community_last_16_weeks
    , w.license_last_16_weeks
    , w.total_filtered_cases;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_team_case_progress_view
  ON app.omic_team_case_progress_view (workload_owner_id)`

  var disable = "ALTER INDEX idx_omic_team_case_progress_view ON app.omic_team_case_progress_view DISABLE;"
  var enable = "ALTER INDEX idx_omic_team_case_progress_view ON app.omic_team_case_progress_view REBUILD;"

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.omic_team_case_progress_view;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
