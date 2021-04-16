exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.workload_percentage_breakdown_view
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS region_name
    , l.description AS ldu_name
    , t.description AS team_name
    , r.id AS region_id
    , l.id AS ldu_id
    , t.id AS team_id
    , wo.id AS workload_owner_id
    , CONCAT(om.forename, ' ', om.surname) AS om_name
    , omt.grade_code
    , (wpc.total_points - wpc.cms_adjustment_points - wpc.gs_adjustment_points - wpc.paroms_points -  wpc.sdr_conversion_points -  wpc.sdr_conversion_points - (w.arms_license_cases * wp.weighting_arms_lic) - (w.arms_community_cases * wp.weighting_arms_comm)) AS total_case_points
    , wpc.total_points AS total_points_overall
    , (wpc.cms_adjustment_points + wpc.gs_adjustment_points + wpc.paroms_points + wpc.sdr_conversion_points + wpc.sdr_conversion_points + (w.arms_license_cases * wp.weighting_arms_lic) + (w.arms_community_cases * wp.weighting_arms_comm)) AS non_case_points_total
    , w.arms_community_cases * wp.weighting_arms_comm AS arms_community_points
    , w.arms_community_cases AS arms_community_cases
    , w.arms_license_cases * wp.weighting_arms_lic AS arms_licence_points
    , w.arms_license_cases AS arms_license_cases
    , wpc.available_points AS available_points
    , wpc.cms_adjustment_points AS cms_adjustment_points
    , wpc.gs_adjustment_points AS gs_adjustment_points
    , wpc.paroms_points AS paroms_points
    , wpc.sdr_points AS sdr_points
    , wpc.sdr_conversion_points AS sdr_conversion_points
    , wpc.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
  FROM app.workload_points_calculations wpc
    JOIN app.workload w ON wpc.workload_id = w.id
    JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
    JOIN app.workload_report wr ON w.workload_report_id = wr.id
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON l.region_id = r.id
    JOIN app.offender_manager om ON wo.offender_manager_id = om.id
    JOIN app.offender_manager_type omt ON om.type_id = omt.id
    JOIN app.workload_points wp ON wpc.workload_points_id = wp.id
  WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.workload_percentage_breakdown_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
