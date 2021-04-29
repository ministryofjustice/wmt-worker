exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.offender_manager_search_view
  WITH SCHEMABINDING
  AS
  SELECT
      wo.id AS workload_owner_id
    , om.forename
    , om.surname
    , t.description AS team
    , l.description AS ldu
    , r.description AS region
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.offender_manager_search_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
