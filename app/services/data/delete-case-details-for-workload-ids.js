const knex = require('../../../knex').appSchema

module.exports = function (workloadIds) {
  return knex('case_details')
    .whereIn('case_details.workload_id', workloadIds)
    .del()
}
