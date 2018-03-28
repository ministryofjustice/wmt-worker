const knex = require('../../../knex').stagingSchema

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd) {
  return knex('cms')
  .select(
    'id',
    'contact_id AS contactId',
    'contact_type_code AS contactCode',
    'contact_date AS contactDate',
    'contact_staff_key AS contactStaffKey',
    'contact_team_key AS contactTeamKey',
    'om_key AS omKey',
    'om_team_key AS omTeamKey'
  )
  .whereIn('om_key', function () {
    this.select('om_key')
      .from('wmt_extract')
      .whereBetween('id', [workloadStagingIdStart, workloadStagingIdEnd])
  })
  .orWhereIn('contact_staff_key', function () {
    this.select('om_key')
      .from('wmt_extract')
      .whereBetween('id', [workloadStagingIdStart, workloadStagingIdEnd])
  })
}
