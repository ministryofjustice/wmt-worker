exports.seed = function (knex, Promise) {
  var sql = `CREATE VIEW app.national_capacity_view 
      WITH SCHEMABINDING 
      AS 
      SELECT SUM(total_points) AS total_points
        , SUM(available_points) AS available_points
        , SUM(reduction_hours) AS reduction_hours
        , SUM(wpc.contracted_hours) AS contracted_hours
        , wr.effective_from AS effective_from
      FROM app.workload_points_calculations AS wpc
        JOIN app.workload w ON wpc.workload_id = w.id
        JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      GROUP BY wr.effective_from;`

  return knex.schema
           .raw('DROP VIEW IF EXISTS app.national_capacity_view;')
           .raw('SET ARITHABORT ON')
           .raw(sql)
}
