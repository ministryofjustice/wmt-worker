const knex = require('../../../knex').appSchema

module.exports = function (teamIds) {
  var columns = [
    'om.forename',
    'om.surname',
    't.description AS teamName',
    't.id AS teamId',
    'om.key AS omKey',
    't.code as teamKey',
    'wo.id as woId'
  ]
  return knex('workload_owner AS wo')
    .join('offender_manager AS om', 'wo.offender_manager_id', 'om.id')
    .join('team AS t', 'wo.team_id', 't.id')
    .whereIn('team_id', teamIds)
    .columns(columns)
}
