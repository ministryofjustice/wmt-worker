const config = require('../../../config')
const knex = require('../../../knex').appSchema
const lduTable = `${config.DB_APP_SCHEMA}.ldu`

module.exports = function (ldu) {
  return knex(lduTable)
    .update('description', ldu.description)
    .update('region_id', ldu.region_id)
    .where({'code': ldu.code})
    .returning('id')
}
