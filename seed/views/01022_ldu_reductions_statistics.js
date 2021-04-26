exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.ldu_reductions_statistics
  WITH SCHEMABINDING
  AS
  SELECT 
      reduction_reason
    , ldu_id
    , COUNT(reduction_reason) AS count
  FROM app.reductions_notes_export_view 
  GROUP BY reduction_reason, ldu_id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.ldu_reductions_statistics;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
