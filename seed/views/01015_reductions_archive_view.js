exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.reductions_archive_view
  WITH SCHEMABINDING
  AS
  SELECT
      CONCAT(om.forename, ' ', om.surname) AS om_name
    , r.hours AS hours_reduced
    , r.id AS reduction_id
    , r.notes AS comments
    , r.updated_date AS last_updated_date
    , u.name AS reduction_added_by
    , rr.reason_short_name AS reduction_reason
    , r.effective_from AS start_date
    , r.effective_to AS end_date
    , r.status AS reduction_status
  FROM app.workload_owner wo
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.reductions r ON r.workload_owner_id = wo.id
    JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
    LEFT JOIN app.users u ON r.user_id = u.id;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.reductions_archive_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
