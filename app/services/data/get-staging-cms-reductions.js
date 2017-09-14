const knexConfig = require('../../../knexfile').staging
const knex = require('knex')(knexConfig)

module.exports = function () {
  return knex('cms')
  .select(
    'contact_id AS contactId',
    'contact_code AS contactCode',
    'contact_type_desc AS contactTypeDesc',
    'contact_date AS contactDate',
    'contact_staff_key AS contactStaffKey',
    'contact_team_key AS contactTeamKey',
    'om_key AS omKey',
    'om_team_key AS omTeamKey'
  )
}
