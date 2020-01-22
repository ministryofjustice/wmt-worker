exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.individual_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      wo.id AS workload_owner_id
    , t.id AS team_id
    , l.id AS ldu_id
    , r.id AS region_id
    , om_type.grade_code AS grade_code
    , CONCAT(om.forename, ' ', om.surname) AS of_name
    , t.description AS team_name
    , l.description AS ldu_name
    , r.description AS region_name
    , wpc.available_points AS available_points
    , wpc.total_points AS total_points
    , (w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , wpc.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
    , wpc.cms_adjustment_points AS cms_adjustment_points
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_individual_case_overview
  ON app.individual_case_overview (workload_owner_id)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
