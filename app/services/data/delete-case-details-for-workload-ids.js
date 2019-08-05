const knex = require('../../../knex').appSchema

module.exports = function (workload_ids) {
  return knex('case_details')
    .whereIn('case_details.workload_id', workload_ids)
    .del()
}
