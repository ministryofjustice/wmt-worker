exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.team_court_reporter_overview
    WITH SCHEMABINDING
    AS
    SELECT
        MAX(CONCAT(om.forename, ' ', om.surname)) AS name
      , MAX(iv.grade_code) AS grade_code
      , MAX(iv.contracted_hours) AS contracted_hours
      , MAX(iv.reduction_hours) AS reduction_hours
      , MAX(iv.link_id) AS id
      , MAX(iv.id) AS link_id
      , SUM(iv.total_cases_sdrs) AS total_cases_sdrs
      , SUM(iv.total_cases_fdrs) AS total_cases_fdrs
      , SUM(iv.total_cases_oral_reports) AS total_cases_oral_reports
    FROM app.individual_court_reporter_overview iv
      JOIN app.workload_owner wo ON wo.id = iv.id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    GROUP BY iv.id;`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.team_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
}
