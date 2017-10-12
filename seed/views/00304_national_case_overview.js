exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.national_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS name
    , SUM(rv.total_cases) AS total_cases
    , SUM(rv.available_points) AS available_points
    , SUM(rv.total_points) AS total_points
    , SUM(rv.contracted_hours) AS contracted_hours
    , SUM(rv.reduction_hours) AS reduction_hours
    , rv.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.region_case_overview rv
    JOIN app.region r ON r.id = rv.id
  GROUP BY rv.id
     , r.description;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.national_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
    .raw('CREATE UNIQUE CLUSTERED INDEX idx_national_case_overview on app.national_case_overview (name)')
}
