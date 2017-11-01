exports.seed = function (knex, promise) {
    var view = `CREATE VIEW app.team_reductions_notes_view
      WITH SCHEMABINDING
      AS
      SELECT
          wo.id AS workload_owner_id
        , t.id AS team_id
        , CONCAT(om.forename, ' ', om.surname) AS name
        , rr.reason_short_name AS reduction_reason
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , r.notes AS additional_notes
      FROM app.workload_owner wo
          JOIN app.team t ON wo.team_id = t.id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL
      ;`
  
    var index = `CREATE UNIQUE CLUSTERED INDEX idx_team_reductions_notes_view
    ON app.team_reductions_notes_view (link_id)`
  
    return knex.schema
        .raw('DROP VIEW IF EXISTS app.team_reductions_notes_view;')
        .raw('SET ARITHABORT ON')
        .raw(view)
        .raw(index)
  }