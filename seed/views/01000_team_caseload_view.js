exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.team_caseload_view
  WITH SCHEMABINDING
  AS
  SELECT
    id
    , link_id
    , name
    , grade_code
    , [0] AS untiered
    , [1] AS d2
    , [2] AS d1
    , [3] AS c2
    , [4] AS c1
    , [5] AS b2
    , [6] AS b1
    , [7] AS a
    , total_cases
  FROM (
      SELECT
        MAX(wo.team_id) as id
      , MAX(om.id) as link_id
      , MAX(CONCAT(om.forename, ' ', om.surname)) AS name
      , MAX(om.grade_code) AS grade_code
      , tr.workload_id as workload_id
      , MAX(tr.tier_number) as tier_number
      , MAX(w.total_cases) as total_cases
      , SUM(tr.total_cases) as tier_number_totals
    FROM app.tiers tr
      LEFT JOIN app.workload w ON tr.workload_id = w.id
      LEFT JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      LEFT JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
    GROUP BY tr.tier_number, tr.workload_id
  ) AS total_per_workload
  PIVOT (
    SUM(tier_number_totals)
    FOR tier_number
    IN ([0],[1],[2],[3],[4],[5],[6],[7])
  ) AS pivoted;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_caseload_view;')
    .raw('DROP VIEW IF EXISTS app.team_caseload_overview;') // Old view name
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
