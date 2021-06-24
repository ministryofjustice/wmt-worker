const knex = require('../../../knex').appSchema
const lduTable = 'ldu'

module.exports = function (ldu) {
  return knex(lduTable)
    .withSchema('app')
    .update('description', ldu.description)
    .update('region_id', ldu.region_id)
    .where({ code: ldu.code })
    .returning('id')
}
