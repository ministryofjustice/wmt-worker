exports.seed = function (knex, promise) {
  var sql = `CREATE VIEW app.national_capacity_breakdown_view
    WITH SCHEMABINDING
    AS
    SELECT 
      0 AS id
    , region_totals.id AS link_id
    , r.description AS name
    , region_totals.grade_code
    , region_totals.total_cases    
    , region_totals.total_points
    , region_totals.available_points
    , region_totals.reduction_hours
    , region_totals.cms_adjustment_points
    , region_totals.gs_adjustment_points
    , region_totals.contracted_hours
    , region_totals.arms_total_cases
    FROM (
      SELECT
          SUM(rcbv.total_points) AS total_points
        , SUM(rcbv.available_points) AS available_points
        , SUM(rcbv.reduction_hours) AS reduction_hours
        , SUM(rcbv.cms_adjustment_points) AS cms_adjustment_points
        , SUM(rcbv.gs_adjustment_points) AS gs_adjustment_points
        , SUM(rcbv.total_cases) AS total_cases
        , SUM(rcbv.contracted_hours) AS contracted_hours        
        , SUM(rcbv.arms_total_cases) AS arms_total_cases
        , r.id as id
        , rcbv.grade_code
      FROM app.region_capacity_breakdown_view rcbv
        JOIN app.region r ON rcbv.id = r.id
      GROUP BY r.id, rcbv.grade_code
    ) region_totals
      JOIN app.region r ON region_totals.id = r.id;`

  return knex.schema
      .raw('DROP VIEW IF EXISTS app.national_capacity_breakdown_view;')
      .raw('SET ARITHABORT ON')
      .raw(sql)
}
