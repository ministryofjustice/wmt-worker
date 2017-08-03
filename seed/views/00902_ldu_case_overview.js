exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.ldu_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(t.description) AS name
    , MAX(om.grade_code) AS grade_code
    , SUM(w.total_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , MAX(l.id) AS id
    , MAX(t.id) AS team_id
  FROM app.team_case_overview tv
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON t.ldu_id = l.id
  GROUP BY t.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
