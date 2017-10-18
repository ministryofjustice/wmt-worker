exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.national_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      MAX(r.description) AS name
    , SUM(rv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(rv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(rv.total_cases) AS total_cases
    , SUM(rv.warrants_total) AS warrants_total
    , SUM(rv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(rv.unpaid_work_total) AS unpaid_work_total
  FROM app.region_case_progress_view rv
    JOIN app.region r ON r.id = rv.id
  GROUP BY rv.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.national_case_progress_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
