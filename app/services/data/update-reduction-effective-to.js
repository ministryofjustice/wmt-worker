const config = require('../../../knexfile').app
const knex = require('knex')(config)

module.exports = function (id, effectiveTo) {
  return knex('reductions')
  .where('id', id)
  .update('effective_to', effectiveTo)
}
