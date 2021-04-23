exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.expiring_reductions_view
  WITH SCHEMABINDING
  AS
  SELECT
    wo.id AS workload_owner_id
    , team.id AS team_id
    , ldu.id AS ldu_id
    , region.id AS region_id
    , region.description AS region_name
    , ldu.description AS ldu_name
    , team.description AS team_name
    , CONCAT(om.forename, ' ', om.surname) AS name
    , wo.contracted_hours AS contracted_hours
    , rr.reason_short_name AS reduction_reason
    , r.id AS reduction_id
    , r.hours AS amount
    , r.effective_from AS start_date
    , r.effective_to AS end_date
    , r.status AS reduction_status
    , r.notes AS additional_notes
    , omt.grade_code AS grade_code
    , u.id AS user_id
    , u.name AS manager_responsible
    , 'probation' AS workload_type
  FROM app.workload_owner wo
    JOIN app.team team ON wo.team_id = team.id
    JOIN app.ldu ldu ON team.ldu_id = ldu.id
    JOIN app.region region ON region.id = ldu.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type omt ON om.type_id = omt.id
    JOIN app.reductions r ON r.workload_owner_id = wo.id
    JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
    JOIN app.users u ON r.user_id = u.id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
    AND r.status = 'ACTIVE'
    AND r.effective_to between GETDATE() AND GETDATE() + 30
  UNION
  SELECT
      wo.id AS workload_owner_id
    , team.id AS team_id
    , ldu.id AS ldu_id
    , region.id AS region_id
    , region.description AS region_name
    , ldu.description AS ldu_name
    , team.description AS team_name
    , CONCAT(om.forename, ' ', om.surname) AS name
    , wo.contracted_hours AS contracted_hours
    , rr.reason_short_name AS reduction_reason
    , r.id AS reduction_id
    , r.hours AS amount
    , r.effective_from AS start_date
    , r.effective_to AS end_date
    , r.status AS reduction_status
    , r.notes AS additional_notes
    , omt.grade_code AS grade_code
    , u.id AS user_id
    , u.name AS manager_responsible
    , 'court-reports' AS workload_type
  FROM app.workload_owner wo
    JOIN app.team team ON wo.team_id = team.id
    JOIN app.ldu ldu ON team.ldu_id = ldu.id
    JOIN app.region region ON region.id = ldu.region_id
    JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
    JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
    JOIN app.workload_report wr ON wr.id = crc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type omt ON om.type_id = omt.id
    JOIN app.reductions r ON r.workload_owner_id = wo.id
    JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
    JOIN app.users u ON r.user_id = u.id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
    AND r.status = 'ACTIVE'
    AND r.effective_to between GETDATE() AND GETDATE() + 30;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.expiring_reductions_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
