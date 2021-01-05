const knex = require('../../../knex').appSchema

module.exports = function (teamId, forename, surname, teamName) {
  var columns = [
    'om.id AS omId',
    'wo.id as woId',
    't.id AS tId',
    'om.key AS omKey',
    'wo.contracted_hours AS contractedHours'
  ]

  return knex('workload_owner AS wo')
    .join('offender_manager AS om', 'wo.offender_manager_id', 'om.id')
    .join('team AS t', 'wo.team_id', 't.id')
    .where({
      'forename': forename,
      'surname': surname,
      't.description': teamName
    })
    .whereNot('team_id', teamId)
    .columns(columns)
}
