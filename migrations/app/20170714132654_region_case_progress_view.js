exports.up = function (knex, Promise) {
  var sql = `CREATE VIEW app.region_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      SUM(lv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(lv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(lv.total_cases) AS total_cases
    , SUM(lv.warrants_total) AS warrants_total
    , SUM(lv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(lv.unpaid_work_total) AS unpaid_work_total
    , MAX(r.id) AS id
  FROM app.ldu_case_progress_view lv
    JOIN app.ldu l ON l.id = lv.id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY l.id;`

  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw('DROP VIEW app.region_case_progress_view;')
}
