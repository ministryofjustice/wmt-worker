exports.seed = function (knex, promise) {
    var sql = `CREATE VIEW app.team_court_report_overview
    WITH SCHEMABINDING
    AS
    SELECT
        MAX(CONCAT(om.forename, ' ', om.surname)) AS name
      , MAX(iv.grade_code) AS grade_code
      , MAX(iv.contracted_hours) AS contracted_hours
      , MAX(iv.default_contracted_hours) AS default_contracted_hours
      , MAX(iv.reduction_hours) AS reduction_hours
      , MAX(iv.team_id) AS id
      , MAX(iv.workload_owner_id) AS link_id
    FROM app.individual_court_reporter_overview iv
      JOIN app.workload_owner wo ON wo.id = iv.workload_owner_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    GROUP BY iv.workload_owner_id;`
  
    return knex.schema
      .raw('DROP VIEW IF EXISTS app.team_court_report_overview;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
  }
  