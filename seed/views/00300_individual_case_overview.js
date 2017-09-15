exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.individual_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      wo.id AS workload_owner_id
    , om_type.grade_code AS grade_code
    , t.id AS team_id
    , t.description AS team_name
    , wpc.available_points AS available_points
    , wpc.total_points AS total_points
    , w.total_cases AS total_cases
    , wo.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
    , wp.default_contracted_hours_po AS default_contracted_hours_po
    , wp.default_contracted_hours_pso AS default_contracted_hours_pso
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_points wp ON wpc.workload_points_id = wp.id 
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}