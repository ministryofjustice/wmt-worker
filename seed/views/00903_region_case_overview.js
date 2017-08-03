exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.region_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(l.description) AS name
    , MAX(om.grade_code) AS grade_code
    , SUM(w.total_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , MAX(r.id) AS id
    , MAX(l.id) AS ldu_id
  FROM app.ldu_case_overview lv
    JOIN app.ldu l ON l.id = lv.id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY l.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
