const knex = require('../../../knex').appSchema

module.exports = function (regionIds) {
  const columns = [
    'om.forename',
    'om.surname',
    't.description AS teamName',
    't.id AS teamId',
    'om.key AS omKey',
    't.code as teamKey',
    'wo.id as woId'
  ]
  return knex('workload_owner AS wo')
    .withSchema('app')
    .join('offender_manager AS om', 'wo.offender_manager_id', 'om.id')
    .join('team AS t', 'wo.team_id', 't.id')
    .join('ldu AS l', 't.ldu_id', 'l.id')
    .join('region AS r', 'l.region_id', 'r.id')
    .whereIn('r.id', regionIds)
    .columns(columns)
}
