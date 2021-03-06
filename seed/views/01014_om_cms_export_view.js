exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.om_cms_export_view
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS omRegionName
    , r.id AS omRegionId
    , l.description AS omLduName
    , l.id AS omLduId
    , t.description AS omTeamName
    , t.id AS omTeamId
    , a.effective_from AS omContactDate
    , wo.id AS omWorkloadOwnerId
    , CONCAT(om.forename, ' ', om.surname) AS omName
    , omt.grade_code AS omGradeCode
    , a.contact_id AS contactId
    , ar.contact_description AS contactDescription
    , ar.contact_code AS contactCode
    , a.points AS omPoints
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
  WHERE wr.effective_from IS NOT NULL 
    AND wr.effective_to IS NULL 
    AND ac.category = 'Case Management Support' 
    AND a.status = 'ACTIVE' 
    AND a.points < 0;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.om_cms_export_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
