exports.up = function (knex, Promise) {
  var sql = `CREATE VIEW app.team_case_progress_view
  WITH SCHEMABINDING
  AS
  SELECT 
      i.community_last_16_weeks AS community_last_16_weeks
    , i.license_last_16_weeks AS license_last_16_weeks
    , i.total_cases AS total_cases
    , i.warrants_total AS warrants_total
    , i.overdue_terminations_total AS overdue_terminations_total
    , i.unpaid_work_total AS unpaid_work_total
    , t.id AS id
  FROM app.individual_case_progress_view i
    JOIN app.workload_owner wo ON i.id = wo.id
    JOIN app.team t ON wo.team_id = t.id;`

  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  return knex.schema
      .raw('DROP VIEW app.team_case_progress_view;')
}
