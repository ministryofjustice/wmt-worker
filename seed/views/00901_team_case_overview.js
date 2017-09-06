exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.team_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(CONCAT(om.forename, ' ', om.surname)) AS name
    , MAX(om.grade_code) AS grade_code
    , MAX(w.total_cases) AS total_cases
    , MAX(wpc.available_points) AS available_points
    , MAX(wpc.total_points) AS total_points
    , MAX(wo.contracted_hours) AS contracted_hours
    , MAX(wp.default_contracted_hours_po) AS default_contracted_hours_po
    , MAX(wp.default_contracted_hours_pso) AS default_contracted_hours_pso
    , MAX(wpc.reduction_hours) AS reduction_hours
    , MAX(t.id) AS id
    , MAX(wo.id) AS link_id
  FROM app.workload w
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_points wp ON wpc.workload_points_id = wp.id 
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY wo.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
