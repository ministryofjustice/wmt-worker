const knexConfig = require('../../../knexfile').staging
const knex = require('knex')(knexConfig)

module.exports = function () {
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
}
