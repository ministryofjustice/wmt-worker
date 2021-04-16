exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.team_reductions_statistics
  WITH SCHEMABINDING
  AS
  SELECT
      reduction_reason
    , team_id
    , COUNT(reduction_reason) AS count
  FROM app.reductions_notes_export_view 
  GROUP BY reduction_reason, team_id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.team_reductions_statistics;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
