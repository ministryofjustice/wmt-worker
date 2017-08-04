exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.ldu_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(t.description) AS name
    , MAX(tv.grade_code) AS grade_code
    , SUM(tv.total_cases) AS total_cases
    , SUM(tv.available_points) AS available_points
    , SUM(tv.total_points) AS total_points
    , SUM(tv.contracted_hours) AS contracted_hours
    , SUM(tv.reduction_hours) AS reduction_hours
    , MAX(l.id) AS id
    , MAX(t.id) AS link_id
  FROM app.team_case_overview tv
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON t.ldu_id = l.id
  GROUP BY t.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.ldu_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
