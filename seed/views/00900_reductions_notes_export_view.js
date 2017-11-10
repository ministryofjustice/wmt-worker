exports.seed = function (knex, promise) {
  var view = `CREATE VIEW app.reductions_notes_export_view
      WITH SCHEMABINDING
      AS
      SELECT
          wo.id AS workload_owner_id
        , team.id AS team_id
        , ldu.id AS ldu_id
        , region.id AS region_id
        , CONCAT(om.forename, ' ', om.surname) AS name
        , rr.reason_short_name AS reduction_reason
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , r.notes AS additional_notes
      FROM app.workload_owner wo
          JOIN app.team team ON wo.team_id = team.id
          JOIN app.ldu ldu ON team.ldu_id = ldu.id
          JOIN app.region region ON region.id = ldu.region_id
          JOIN app.workload w ON wo.id = w.workload_owner_id
          JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
          JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL;`

  var index = `CREATE UNIQUE CLUSTERED INDEX idx_reductions_notes_export_view
          ON app.reductions_notes_export_view(workload_owner_id, reduction_reason, start_date, end_date, reduction_status, amount)`

  return knex.schema
        .raw('DROP VIEW IF EXISTS app.reductions_notes_export_view;')
        .raw('SET ARITHABORT ON')
        .raw(view)
        .raw(index)
}
