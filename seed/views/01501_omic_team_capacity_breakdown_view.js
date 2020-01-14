exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.omic_team_capacity_breakdown_view
        WITH SCHEMABINDING
        AS
        SELECT
            t.id AS id
          , wo.id AS link_id 
          , om.forename
          , om.surname
          , omt.grade_code
          , w.total_filtered_cases AS total_cases
          , w.total_t2a_cases
          , w.monthly_sdrs
          , w.sdr_conversions_last_30_days
          , w.paroms_completed_last_30_days
          , wpc.total_points
          , wpc.available_points
          , wpc.reduction_hours
          , wpc.cms_adjustment_points
          , wpc.gs_adjustment_points
          , wpc.contracted_hours
          , wpc.arms_total_cases
        FROM app.omic_workload_points_calculations wpc
          JOIN app.omic_workload w ON wpc.omic_workload_id = w.id
          JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
          JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
          JOIN app.team t ON wo.team_id = t.id
          JOIN app.offender_manager om ON wo.offender_manager_id = om.id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
        WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_team_capacity_breakdown_view
  ON app.omic_team_capacity_breakdown_view (link_id)`

  var disable = "ALTER INDEX idx_omic_team_capacity_breakdown_view ON app.omic_team_capacity_breakdown_view DISABLE;"
  var enable = "ALTER INDEX idx_omic_team_capacity_breakdown_view ON app.omic_team_capacity_breakdown_view REBUILD;"

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.omic_team_capacity_breakdown_view;')
      .raw('SET ARITHABORT ON')
      .raw(view)
      .raw(index)
}
