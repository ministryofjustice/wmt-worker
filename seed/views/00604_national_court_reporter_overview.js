exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.national_court_reporter_overview
    WITH SCHEMABINDING
    AS
    SELECT
      0 AS id
      , MAX(r.description) AS name
      , MAX(rv.id) AS link_id      
      , MAX(rv.grade_code) AS grade_code
      , SUM(rv.contracted_hours) AS contracted_hours
      , SUM(rv.reduction_hours) AS reduction_hours
      , SUM(rv.total_sdrs) AS total_sdrs
      , SUM(rv.total_fdrs) AS total_fdrs
      , SUM(rv.total_oral_reports) AS total_oral_reports
    FROM app.region_court_reporter_overview rv
      JOIN app.region r ON rv.id = r.id  
    GROUP BY rv.id;`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.national_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
}
