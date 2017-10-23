exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.region_court_reporter_overview
    WITH SCHEMABINDING
    AS
    SELECT
        r.id
      , l.description AS name
      , l.id AS link_id
      , SUM(crc.contracted_hours) AS contracted_hours
      , SUM(crc.reduction_hours) AS reduction_hours
      , SUM(cr.total_sdrs) AS total_sdrs
      , SUM(cr.total_fdrs) AS total_fdrs
      , SUM(cr.total_oral_reports) AS total_oral_reports
      , COUNT_BIG(*) AS count
    FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
        JOIN app.ldu l ON l.id = t.ldu_id
        JOIN app.region r ON r.id = l.region_id
    WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
    GROUP BY r.id, l.id, l.description;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_region_court_reporter_overview
  ON app.region_court_reporter_overview (link_id)`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.region_court_reporter_overview;')
      .raw('SET ARITHABORT ON')
      .raw(view)
      .raw(index)
}
