exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.ldu_court_reporter_overview
    WITH SCHEMABINDING
    AS
    SELECT
      MAX(l.id) AS id
      , MAX(t.description) AS name
      , MAX(tv.id) AS link_id      
      , MAX(tv.grade_code) AS grade_code
      , SUM(tv.contracted_hours) AS contracted_hours
      , SUM(tv.reduction_hours) AS reduction_hours
      , SUM(tv.total_sdrs) AS total_sdrs
      , SUM(tv.total_fdrs) AS total_fdrs
      , SUM(tv.total_oral_reports) AS total_oral_reports
    FROM app.team_court_reporter_overview tv
      JOIN app.team t ON tv.id = t.id
      JOIN app.ldu l ON l.id = t.ldu_id
    GROUP BY tv.id;`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.ldu_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
}
