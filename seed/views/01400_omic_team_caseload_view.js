exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.omic_team_caseload_view
  WITH SCHEMABINDING
  AS
  SELECT
      wo.team_id AS id
    , wo.id AS link_id
    , om.forename
    , om.surname
    , omt.grade_code
    , tr.location
    , SUM((CASE WHEN tr.tier_number = 0 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 0 THEN tr.t2a_total_cases ELSE 0 END)) AS untiered
    , SUM((CASE WHEN tr.tier_number = 10 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 10 THEN tr.t2a_total_cases ELSE 0 END)) AS g
    , SUM((CASE WHEN tr.tier_number = 9 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 9 THEN tr.t2a_total_cases ELSE 0 END)) AS f
    , SUM((CASE WHEN tr.tier_number = 8 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 8 THEN tr.t2a_total_cases ELSE 0 END)) AS e
    , SUM((CASE WHEN tr.tier_number = 1 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 1 THEN tr.t2a_total_cases ELSE 0 END)) AS d2
    , SUM((CASE WHEN tr.tier_number = 2 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 2 THEN tr.t2a_total_cases ELSE 0 END)) AS d1
    , SUM((CASE WHEN tr.tier_number = 3 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 3 THEN tr.t2a_total_cases ELSE 0 END)) AS c2
    , SUM((CASE WHEN tr.tier_number = 4 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 4 THEN tr.t2a_total_cases ELSE 0 END)) AS c1
    , SUM((CASE WHEN tr.tier_number = 5 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 5 THEN tr.t2a_total_cases ELSE 0 END)) AS b2
    , SUM((CASE WHEN tr.tier_number = 6 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 6 THEN tr.t2a_total_cases ELSE 0 END)) AS b1
    , SUM((CASE WHEN tr.tier_number = 7 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 7 THEN tr.t2a_total_cases ELSE 0 END)) AS a
    , SUM(tr.total_filtered_cases + tr.t2a_total_cases) AS total_cases
    , COUNT_BIG(*) AS count
  FROM app.omic_tiers tr
      JOIN app.omic_workload w ON tr.omic_workload_id = w.id
      JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY wo.team_id, wo.id, om.forename, om.surname, omt.grade_code, tr.location;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_team_caseload_view
  ON app.omic_team_caseload_view (link_id, location, grade_code)`

  var disable = "ALTER INDEX idx_omic_team_caseload_view ON app.omic_team_caseload_view DISABLE;"
  var enable = "ALTER INDEX idx_omic_team_caseload_view ON app.omic_team_caseload_view REBUILD;"

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.omic_team_caseload_view;')
    .raw('DROP VIEW IF EXISTS app.omic_team_caseload_overview;') // Old view name
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
