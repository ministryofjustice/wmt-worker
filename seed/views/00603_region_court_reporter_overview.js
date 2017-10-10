exports.seed = function (knex, promise) {
    var sql = `CREATE VIEW app.region_court_reporter_overview
    WITH SCHEMABINDING
    AS
    SELECT
      MAX(r.id) AS id
      , MAX(l.description) AS name
      , MAX(lv.id) AS link_id      
      , MAX(lv.grade_code) AS grade_code
      , MAX(lv.contracted_hours) AS contracted_hours
      , MAX(lv.reduction_hours) AS reduction_hours
      , SUM(lv.total_cases_sdrs) AS total_cases_sdrs
      , SUM(lv.total_cases_fdrs) AS total_cases_fdrs
      , SUM(lv.total_cases_oral_reports) AS total_cases_oral_reports
    FROM app.ldu_court_reporter_overview lv
      JOIN app.ldu l ON lv.id = l.id
      JOIN app.region r ON r.id = l.region_id
    GROUP BY lv.id;`
  
    return knex.schema
      .raw('DROP VIEW IF EXISTS app.region_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
  }