exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.omic_team_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      CONCAT(om.forename, ' ', om.surname) AS name
    , om_type.grade_code AS grade_code
    , (w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , wpc.available_points AS available_points
    , wpc.total_points AS total_points
    , wpc.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
    , wpc.cms_adjustment_points AS cms_adjustment_points
    , t.id AS id
    , wo.id AS link_id
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.omic_workload w ON wo.id = w.workload_owner_id
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_team_case_overview
  ON app.omic_team_case_overview (link_id)`

  var disable = "ALTER INDEX idx_omic_team_case_overview ON app.omic_team_case_overview DISABLE;"
  var enable = "ALTER INDEX idx_omic_team_case_overview ON app.omic_team_case_overview REBUILD;"

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.omic_team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
