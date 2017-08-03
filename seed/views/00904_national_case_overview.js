exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.national_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(r.description) AS name
    , MAX(om.grade_code) AS grade_code
    , SUM(w.total_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , MAX(l.id) AS id
    , MAX(r.id) AS region_id
  FROM app.region_case_overview rv
    JOIN app.region r ON r.id = rv.id
  GROUP BY rv.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
