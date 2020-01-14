exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.omic_national_capacity_breakdown_view
    WITH SCHEMABINDING
    AS
    SELECT 
    r.id AS link_id
    , r.description AS name
    , omt.grade_code
    , SUM(w.total_filtered_cases) AS total_cases
    , SUM(w.total_t2a_cases) AS total_t2a_cases
    , SUM(w.monthly_sdrs) AS monthly_sdrs
    , SUM(w.sdr_conversions_last_30_days) AS sdr_conversions_last_30_days
    , SUM(w.paroms_completed_last_30_days) AS paroms_completed_last_30_days
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , SUM(wpc.gs_adjustment_points) AS gs_adjustment_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.arms_total_cases) AS arms_total_cases
    , COUNT_BIG(*) AS count
    FROM app.omic_workload_points_calculations wpc
      JOIN app.omic_workload w ON wpc.omic_workload_id = w.id
      JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.offender_manager om ON wo.offender_manager_id = om.id
      JOIN app.offender_manager_type omt ON om.type_id = omt.id
      JOIN app.team t ON wo.team_id = t.id
      JOIN app.ldu l ON t.ldu_id = l.id
      JOIN app.region r ON l.region_id = r.id
    WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
    GROUP BY r.id, r.description, omt.grade_code;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_national_capacity_breakdown_view
  ON app.omic_national_capacity_breakdown_view (link_id, grade_code)`

  var disable = "ALTER INDEX idx_omic_national_capacity_breakdown_view ON app.omic_national_capacity_breakdown_view DISABLE;"
  var enable = "ALTER INDEX idx_omic_national_capacity_breakdown_view ON app.omic_national_capacity_breakdown_view REBUILD;"

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.omic_national_capacity_breakdown_view;')
      .raw('SET ARITHABORT ON')
      .raw(view)
      .raw(index)
}
