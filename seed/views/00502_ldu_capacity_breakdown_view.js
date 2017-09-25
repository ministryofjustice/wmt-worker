exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.ldu_capacity_breakdown_view
    WITH SCHEMABINDING
    AS
    SELECT
      l.id AS id
    , team_totals.id AS link_id
    , t.description AS name
    , team_totals.grade_code
    , team_totals.total_cases
    , team_totals.total_points
    , team_totals.available_points
    , team_totals.reduction_hours
    , team_totals.cms_reduction_hours
    , team_totals.contracted_hours
    FROM (
      SELECT
        SUM(tcbv.total_points) AS total_points
      , SUM(tcbv.available_points) AS available_points
      , SUM(tcbv.reduction_hours) AS reduction_hours
      , SUM(tcbv.cms_reduction_hours) AS cms_reduction_hours
      , SUM(tcbv.total_cases) AS total_cases
      , SUM(tcbv.contracted_hours) AS contracted_hours
      , t.id as id
      , tcbv.grade_code
      FROM app.team_capacity_breakdown_view tcbv
        JOIN app.team t ON tcbv.id = t.id
      GROUP BY t.id, tcbv.grade_code
    ) team_totals
      JOIN app.team t ON team_totals.id = t.id
      JOIN app.ldu l ON t.ldu_id = l.id;`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.ldu_capacity_breakdown_view;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
}
