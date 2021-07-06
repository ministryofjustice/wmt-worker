const knex = require('../../../knex').stagingSchema

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd) {
  if (workloadStagingIdStart === undefined || workloadStagingIdEnd === undefined) {
    return knex('cms')
      .withSchema('staging')
      .select(
        'id',
        'contact_id AS contactId',
        'contact_type_code AS contactCode',
        'contact_date AS contactDate',
        'contact_staff_key AS contactStaffKey',
        'contact_team_key AS contactTeamKey',
        'om_key AS omKey',
        'om_team_key AS omTeamKey',
        'crn'
      )
  } else {
    return knex('cms')
      .withSchema('staging')
      .select(
        'id',
        'contact_id AS contactId',
        'contact_type_code AS contactCode',
        'contact_date AS contactDate',
        'contact_staff_key AS contactStaffKey',
        'contact_team_key AS contactTeamKey',
        'om_key AS omKey',
        'om_team_key AS omTeamKey',
        'crn'
      )
      .whereIn('om_key', function () {
        this.select('om_key')
          .from('wmt_extract')
          .withSchema('staging')
          .whereBetween('id', [workloadStagingIdStart, workloadStagingIdEnd])
      })
      .orWhereIn('contact_staff_key', function () {
        this.select('om_key')
          .from('wmt_extract')
          .withSchema('staging')
          .whereBetween('id', [workloadStagingIdStart, workloadStagingIdEnd])
      })
  }
}
