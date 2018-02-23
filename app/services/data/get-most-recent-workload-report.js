const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('app.workload_report')
    .select('id')
    .limit(1)
    .orderBy('id', 'desc')
}
