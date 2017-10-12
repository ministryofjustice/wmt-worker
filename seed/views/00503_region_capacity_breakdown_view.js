exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.region_capacity_breakdown_view
    WITH SCHEMABINDING
    AS
    SELECT 
      r.id AS id
    , ldu_totals.id AS link_id
    , l.description AS name
    , ldu_totals.grade_code
    , ldu_totals.total_cases    
    , ldu_totals.total_points
    , ldu_totals.available_points
    , ldu_totals.reduction_hours
    , ldu_totals.cms_adjustment_points
    , ldu_totals.gs_adjustment_points
    , ldu_totals.contracted_hours
    FROM (
      SELECT
        SUM(lcbv.total_points) AS total_points
      , SUM(lcbv.available_points) AS available_points
      , SUM(lcbv.reduction_hours) AS reduction_hours
      , SUM(lcbv.cms_adjustment_points) AS cms_adjustment_points
      , SUM(lcbv.gs_adjustment_points) AS gs_adjustment_points
      , SUM(lcbv.total_cases) AS total_cases
      , SUM(lcbv.contracted_hours) AS contracted_hours      
      , l.id as id
      , lcbv.grade_code
      FROM app.ldu_capacity_breakdown_view lcbv
        JOIN app.ldu l ON lcbv.id = l.id
      GROUP BY l.id, lcbv.grade_code
    ) ldu_totals
      JOIN app.ldu l ON ldu_totals.id = l.id
      JOIN app.region r ON l.region_id = r.id;`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.region_capacity_breakdown_view;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
}
