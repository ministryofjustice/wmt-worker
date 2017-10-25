exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.team_caseload_view
  WITH SCHEMABINDING
  AS
  SELECT
    id
    , link_id
    , CONCAT(forename, ' ',  surname) AS name
    , grade_code
    , [0] AS untiered
    , [1] AS d2
    , [2] AS d1
    , [3] AS c2
    , [4] AS c1
    , [5] AS b2
    , [6] AS b1
    , [7] AS a
    , case_type
    , [0] + [1] + [2] + [3] + [4] + [5] + [6] + [7] AS total_cases
  FROM app.caseload_base_view AS total_per_workload WITH (NOEXPAND)
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
