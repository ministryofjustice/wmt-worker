exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.team_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      CONCAT(om.forename, ' ', om.surname) AS name
    , iv.grade_code AS grade_code
    , iv.total_cases AS total_cases
    , iv.available_points AS available_points
    , iv.total_points AS total_points
    , iv.contracted_hours AS contracted_hours
    , iv.reduction_hours AS reduction_hours
    , iv.team_id AS id
    , iv.workload_owner_id AS link_id
  FROM app.individual_case_overview iv
    JOIN app.workload_owner wo ON wo.id = iv.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_team_case_overview
  ON app.team_case_overview (name)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
