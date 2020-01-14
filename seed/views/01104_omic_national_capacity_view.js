exports.seed = function (knex, Promise) {
  var view = `CREATE VIEW app.omic_national_capacity_view 
    WITH SCHEMABINDING 
    AS 
    SELECT SUM(total_points) AS total_points
      , SUM(available_points) AS available_points
      , SUM(reduction_hours) AS reduction_hours
      , SUM(wpc.contracted_hours) AS contracted_hours
      , wr.effective_from AS effective_from
      , wr.id AS workload_report_id
      , COUNT_BIG(*) AS count
    FROM app.omic_workload_points_calculations AS wpc
      JOIN app.omic_workload AS w ON wpc.omic_workload_id = w.id
      JOIN app.workload_report AS wr ON wpc.workload_report_id = wr.id
    GROUP BY wr.effective_from, wr.id;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_omic_national_capacity_view
  ON app.omic_national_capacity_view (workload_report_id)`

  var disable = "ALTER INDEX idx_omic_national_capacity_view ON app.omic_national_capacity_view DISABLE;"
  var enable = "ALTER INDEX idx_omic_national_capacity_view ON app.omic_national_capacity_view REBUILD;"

  return knex.schema
           .raw('DROP VIEW IF EXISTS app.omic_national_capacity_view;')
           .raw('SET ARITHABORT ON')
           .raw(view)
           .raw(index)
}
