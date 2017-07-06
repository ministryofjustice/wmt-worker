exports.up = function (knex, Promise) {
  var sql = `CREATE VIEW app.team_capacity_view 
      WITH SCHEMABINDING 
      AS 
      SELECT SUM(total_points) AS total_points
        , SUM(sdr_points) AS sdr_points
        , SUM(sdr_conversion_points) AS sdr_conversion_points
        , SUM(paroms_points) AS paroms_points
        , SUM(available_points) AS available_points
        , wr.effective_from AS effective_from
        , t.id AS team_id
      FROM app.workload_points_calculations AS wpc
        JOIN app.workload AS w ON wpc.workload_id = w.id
        JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
        JOIN app.team AS t ON wo.team_id = t.id
        JOIN app.workload_report AS wr ON wpc.workload_report_id = wr.id
      GROUP BY t.id, wr.effective_from;`

  return knex.schema
           .raw('SET ARITHABORT ON')
           .raw(sql)
}

exports.down = function (knex, Promise) {
  return knex.schema
      .raw('DROP VIEW app.team_capacity_view;')
}
