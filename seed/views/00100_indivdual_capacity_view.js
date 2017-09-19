exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.individual_capacity_view 
    WITH SCHEMABINDING 
    AS 
    SELECT 
      wr.effective_from
      , wr.effective_to
      , wpc.total_points
      , wpc.available_points
      , wpc.reduction_hours
      , w.workload_owner_id AS id
      , wo.team_id AS org_id
      , CONCAT(om.forename, ' ', om.surname) AS name
      , omt.grade_code
      , w.total_cases
      , wpc.cms_reduction_hours
      , wpc.contracted_hours
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.individual_capacity_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
