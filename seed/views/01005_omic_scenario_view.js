exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.omic_scenario_view
  WITH SCHEMABINDING
  AS
  SELECT
      r.id AS region_id
    , r.description AS region_name
    , l.id AS ldu_id
    , l.description AS ldu_name
    , t.id AS team_id
    , t.description AS team_name
    , CONCAT(om.forename, ' ', om.surname) AS om_name
    , wo.id AS workload_owner_id
    , omt.grade_code
    , tr.location
    , tr.total_filtered_cases AS total_cases
    , tr.tier_number
    , tr.t2a_total_cases
    , tr.warrants_total
    , tr.t2a_warrants_total
    , tr.overdue_terminations_total
    , tr.t2a_overdue_terminations_total
    , tr.unpaid_work_total
    , tr.t2a_unpaid_work_total
    , w.id AS workload_id
    , w.arms_community_cases AS arms_community_cases
    , w.arms_license_cases AS arms_license_cases
    , wpc.nominal_target AS nominal_target
    , wpc.contracted_hours AS contracted_hours
    , wp.default_contracted_hours_po AS default_contracted_hours_po
    , wp.default_contracted_hours_pso AS default_contracted_hours_pso
    , wp.default_contracted_hours_spo AS default_contracted_hours_spo
    , w.monthly_sdrs AS sdr_total
    , w.sdr_conversions_last_30_days AS sdr_conversions_total
    , w.paroms_completed_last_30_days AS paroms_total
  FROM app.omic_tiers tr
    JOIN app.omic_workload w ON tr.omic_workload_id = w.id
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.team t ON t.id = wo.team_id
    JOIN app.ldu l ON l.id = t.ldu_id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type omt ON omt.id = om.type_id
    JOIN app.workload_points wp ON wpc.workload_points_id = wp.id
  WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.omic_scenario_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
