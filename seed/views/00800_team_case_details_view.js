exports.seed = function (knex, Promise) {
  const sql = `CREATE VIEW app.team_case_details_view
        WITH SCHEMABINDING
        AS
  SELECT
        wo.team_id AS id
      , wo.id AS link_id
      , l.description AS ldu_description
      , t.description AS team_description
      , om.forename
      , om.surname
      , omt.grade_code
      , cd.row_type AS flag
      , cd.case_ref_no
      , cd.location
      , cd.tier_code
      , COUNT_BIG(*) AS count
  FROM app.case_details cd
        JOIN app.workload w ON w.id = cd.workload_id
        JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
        JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
        JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
        JOIN app.team t ON t.id = wo.team_id
        JOIN app.ldu l ON l.id = t.ldu_id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
  GROUP BY wo.team_id, wo.id, om.forename, om.surname, omt.grade_code, cd.row_type, cd.case_ref_no, cd.location, cd.tier_code, l.description, t.description;`

  const index = `CREATE UNIQUE CLUSTERED INDEX idx_team_case_details_view
  ON app.team_case_details_view (id, link_id, flag, case_ref_no, location, tier_code)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_details_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
    .raw(index)
}
