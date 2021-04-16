exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.arms_export_view
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS regionName
    , r.id AS regionId
    , l.description AS lduName
    , l.id AS lduId
    , t.description AS teamName
    , t.id AS teamId
    , CAST(a.assessment_date AS datetime2) AS assessmentDate
    , a.crn as CRN
    , wo.id AS workload_owner_id
    , CONCAT(om.forename, ' ', om.surname) AS omName
    , omt.grade_code
    , a.sentence_type AS sentenceType
    , a.disposal_or_release_date AS releaseDate
    , a.completed_date AS completedDate
  FROM staging.arms AS a
    JOIN app.team AS t ON a.assessment_team_key = t.code
    JOIN app.ldu AS l ON t.ldu_id = l.id
    JOIN app.region AS r ON r.id = l.region_id
    JOIN app.offender_manager AS om ON a.assessment_staff_key = om.[key]
    JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
    JOIN app.workload_owner AS wo ON t.id = wo.team_id AND om.id = wo.offender_manager_id
    JOIN app.workload AS w ON wo.id = w.workload_owner_id
    JOIN app.workload_report AS wr ON wr.id = w.workload_report_id
  WHERE wr.effective_from IS NOT NULL and wr.effective_to IS NULL;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.arms_export_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
