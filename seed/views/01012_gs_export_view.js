exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.gs_export_view
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS regionName
    , r.id AS regionId
    , l.description AS lduName
    , l.id AS lduId
    , t.description AS teamName
    , t.id AS teamId
    , a.contact_id AS contactId
    , a.effective_from AS contactDate
    , wo.id AS workload_owner_id
    , CONCAT(om.forename, ' ', om.surname) AS omName
    , omt.grade_code AS omGradeCode
    , ar.contact_description AS contact_description
    , ar.contact_code AS contactCode
    , a.points AS points
    , a.case_ref_no AS caseRefNo
  FROM app.adjustments AS a 
    JOIN app.adjustment_reason AS ar ON a.adjustment_reason_id = ar.id
    JOIN app.adjustment_category AS ac ON ar.category_id = ac.id
    JOIN app.workload_owner AS wo ON a.workload_owner_id = wo.id
    JOIN app.workload AS w ON w.workload_owner_id = wo.id
    JOIN app.offender_manager AS om ON wo.offender_manager_id = om.id
    JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
    JOIN app.team AS t ON wo.team_id = t.id
    JOIN app.ldu AS l ON t.ldu_id = l.id
    JOIN app.region AS r ON l.region_id = r.id
    JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
  WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL AND ac.category = 'Group Supervision' AND a.status = 'ACTIVE';`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.gs_export_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
