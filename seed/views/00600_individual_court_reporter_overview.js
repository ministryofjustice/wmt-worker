exports.seed = function (knex, Promise) {
    var sql = `CREATE VIEW app.individual_court_reporter_overview
      WITH SCHEMABINDING 
      AS 
      SELECT
        wo.id AS id 
        , om_type.grade_code AS grade_code
        , t.id AS link_id
        , t.description AS name
        , crwpc.contracted_hours AS contracted_hours
        , crwpc.reduction_hours AS reduction_hours
        , crw.total_cases_sdr AS total_cases_sdrs
        , crw.total_cases_fdr AS total_cases_fdrs
        , crw.total_cases_oral_reports AS total_cases_oral_reports
      FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports_workload crw ON wo.id = crw.workload_owner_id
        JOIN app.court_reports_workload_points_calculation crwpc ON crwpc.court_reports_workload_id = crw.id
        JOIN app.workload_report wr ON wr.id = crwpc.workload_report_id
      WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL;`
  
    return knex.schema
      .raw('DROP VIEW IF EXISTS app.individual_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
  }
  