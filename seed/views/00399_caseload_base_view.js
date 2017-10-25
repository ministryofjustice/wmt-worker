exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.caseload_base_view
  WITH SCHEMABINDING
  AS
  SELECT
      wo.team_id AS id
    , wo.id AS link_id
    , om.forename
    , om.surname
    , omt.grade_code
    , tr.workload_id
    , tr.location AS case_type
    , tr.tier_number AS tier_number
    , SUM(tr.total_cases) AS tier_number_totals
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
    JOIN app.workload w ON tr.workload_id = w.id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
  AND wr.effective_to IS NULL
  GROUP BY
      tr.tier_number
    , tr.location
    , tr.workload_id
    , wo.team_id
    , wo.id
    , om.forename
    , om.surname
    , omt.grade_code;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_caseload_base_view
  ON app.caseload_base_view (link_id, case_type, tier_number)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_caseload_view;')
    .raw('DROP VIEW IF EXISTS app.team_caseload_overview;') // Old view name
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
