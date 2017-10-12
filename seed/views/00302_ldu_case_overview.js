exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.ldu_case_overview
  WITH SCHEMABINDING
  AS
  SELECT
      t.description AS name
    , SUM(tv.available_points) AS available_points
    , SUM(tv.total_points) AS total_points
    , SUM(tv.contracted_hours) AS contracted_hours
    , SUM(tv.reduction_hours) AS reduction_hours
    , l.id AS id
    , t.id AS link_id
  FROM app.team_case_overview tv
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON t.ldu_id = l.id
  GROUP BY t.id, t.description, l.id;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_ldu_case_overview
  ON app.team_case_overview (name)`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.ldu_case_overview;')
    .raw('SET ARITHABORT ON')
    .raw(view)
    .raw(index)
}
