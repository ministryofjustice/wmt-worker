exports.up = function (knex, Promise) {
  var sql = `CREATE VIEW app.ldu_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      SUM(tv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(tv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(tv.total_cases) AS total_cases
    , SUM(tv.warrants_total) AS warrants_total
    , SUM(tv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tv.unpaid_work_total) AS unpaid_work_total
    , MAX(l.id) AS id
  FROM app.team_case_progress_view tv
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON t.ldu_id = l.id
  GROUP BY t.id;`

  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw('DROP VIEW app.ldu_case_progress_view;')
}
