exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.region_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(l.description) AS name
    , SUM(lv.total_cases) AS total_cases
    , SUM(lv.available_points) AS available_points
    , SUM(lv.total_points) AS total_points
    , SUM(lv.contracted_hours) AS contracted_hours
    , SUM(lv.reduction_hours) AS reduction_hours
    , MAX(lv.default_contracted_hours_po) AS default_contracted_hours_po
    , MAX(lv.default_contracted_hours_pso) AS default_contracted_hours_pso
    , MAX(r.id) AS id
    , MAX(l.id) AS link_id
  FROM app.ldu_case_overview lv
    JOIN app.ldu l ON l.id = lv.id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY l.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.region_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
