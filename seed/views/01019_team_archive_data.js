exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.team_archive_data
  WITH SCHEMABINDING
  AS
  SELECT
      wr.effective_from AS workload_date
    , w.id AS workload_id
    , l.id AS ldu_id
    , r.description AS region_name
    , l.description AS ldu_name
    , t.description AS team_name
    , t.id AS team_id
    , wo.id AS link_id 
    , CONCAT(om.forename, ' ', om.surname) AS om_name
    , omt.grade_code
    , w.total_cases AS total_cases
    , w.total_filtered_cases AS total_filtered_cases
    , w.total_t2a_cases
    , w.monthly_sdrs
    , w.sdr_conversions_last_30_days
    , w.paroms_completed_last_30_days
    , wpc.total_points AS total_points
    , wpc.available_points AS available_points
    , wpc.reduction_hours AS hours_reduction
    , wpc.cms_adjustment_points AS cms_adjustment_points
    , wpc.gs_adjustment_points AS gs_adjustment_points
    , wpc.contracted_hours AS contracted_hours
    , wpc.arms_total_cases AS arms_total_cases
    , wpc.paroms_points AS paroms_points
    , wpc.sdr_points AS sdr_points
    , wpc.sdr_conversion_points AS sdr_conversion_points
    , wpc.nominal_target AS nominal_target
  FROM app.workload_points_calculations wpc
    JOIN app.workload w ON wpc.workload_id = w.id
    JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
    JOIN app.workload_report wr ON w.workload_report_id = wr.id
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON l.region_id = r.id
    JOIN app.offender_manager om ON wo.offender_manager_id = om.id
    JOIN app.offender_manager_type omt ON om.type_id = omt.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_archive_data;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
