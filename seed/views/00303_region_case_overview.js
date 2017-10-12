exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.region_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      l.description AS name
    , SUM(lv.available_points) AS available_points
    , SUM(lv.total_points) AS total_points
    , SUM(lv.contracted_hours) AS contracted_hours
    , SUM(lv.reduction_hours) AS reduction_hours
    , r.id AS id
    , l.id AS link_id
  FROM app.ldu_case_overview lv
    JOIN app.ldu l ON l.id = lv.id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY l.id, l.description, r.id;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_region_case_overview
  ON app.team_case_overview (name)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.region_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
