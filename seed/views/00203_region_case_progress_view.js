exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.region_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      MAX(l.description) AS name
    , SUM(tv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(tv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(tv.total_cases) AS total_cases
    , SUM(tv.warrants_total) AS warrants_total
    , SUM(tv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tv.unpaid_work_total) AS unpaid_work_total
    , MAX(r.id) AS id
  FROM app.team_case_progress_view tv WITH (NOEXPAND)
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON l.id = t.ldu_id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY l.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.region_case_progress_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
