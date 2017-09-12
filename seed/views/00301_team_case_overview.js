exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.team_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(CONCAT(om.forename, ' ', om.surname)) AS name
    , MAX(iv.grade_code) AS grade_code
    , MAX(iv.total_cases) AS total_cases
    , MAX(iv.available_points) AS available_points
    , MAX(iv.total_points) AS total_points
    , MAX(iv.contracted_hours) AS contracted_hours
    , MAX(iv.default_contracted_hours_po) AS default_contracted_hours_po
    , MAX(iv.default_contracted_hours_pso) AS default_contracted_hours_pso
    , MAX(iv.reduction_hours) AS reduction_hours
    , MAX(iv.team_id) AS id
    , MAX(iv.workload_owner_id) AS link_id
  FROM app.individual_case_overview iv
    JOIN app.workload_owner wo ON wo.id = iv.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
  GROUP BY iv.workload_owner_id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
