const knex = require('../../../knex').appSchema

module.exports = function (team_id, forename, surname, team_name) {
  var columns = [
    'om.id AS omId',
    'wo.id as woId',
    't.id AS tId',
    'om.key AS omKey',
    
  ]
  return knex('workload_owner AS wo')
    .join('offender_manager AS om', 'wo.offender_manager_id', 'om.id')
    .join('team AS t', 'wo.team_id', 't.id')
    .where({
      'forename': forename,
      'surname': surname,
      't.description': team_name
    })
    .whereNot('team_id', team_id)
    .columns(columns)
}
