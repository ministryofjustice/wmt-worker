exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.team_court_reporter_overview
    WITH SCHEMABINDING
    AS
    SELECT
        om.forename
      , om.surname
      , om_type.grade_code
      , crc.contracted_hours
      , crc.reduction_hours
      , t.id
      , wo.id AS link_id
      , cr.total_sdrs
      , cr.total_fdrs
      , cr.total_oral_reports
    FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
    WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_team_court_reporter_overview
  ON app.team_court_reporter_overview (link_id)`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.team_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(view)
      .raw(index)
}
