exports.up = function (knex, Promise) {
  var sql = `CREATE VIEW app.individual_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      MAX(CONCAT(om.forename, ' ', om.surname)) AS name
    , MAX(w.community_last_16_weeks) AS community_last_16_weeks
    , MAX(w.license_last_16_weeks) AS license_last_16_weeks
    , MAX(w.total_cases) AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , w.workload_owner_id AS id
  FROM app.workload w
    LEFT JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    LEFT JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    LEFT JOIN app.tiers tr ON tr.workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
  WHERE wr.effective_from IS NOT NULL
  AND wr.effective_to IS NULL
  GROUP BY w.workload_owner_id;`

  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  return knex.schema
      .raw('DROP VIEW app.individual_case_progress_view;')
}
