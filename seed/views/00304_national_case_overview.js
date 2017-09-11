exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.national_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(r.description) AS name
    , SUM(rv.total_cases) AS total_cases
    , SUM(rv.available_points) AS available_points
    , SUM(rv.total_points) AS total_points
    , SUM(rv.contracted_hours) AS contracted_hours
    , SUM(rv.reduction_hours) AS reduction_hours
    , MAX(rv.default_contracted_hours_po) AS default_contracted_hours_po
    , MAX(rv.default_contracted_hours_pso) AS default_contracted_hours_pso
    , MAX(r.id) AS link_id
  FROM app.region_case_overview rv
    JOIN app.region r ON r.id = rv.id
  GROUP BY rv.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.national_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
