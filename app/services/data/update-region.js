const config = require('../../../config')
const knex = require('../../../knex').appSchema
const regionTable = `${config.DB_APP_SCHEMA}.region`

module.exports = function (region) {
  return knex(regionTable)
    .update('description', region.description)
    .where({'code': region.code})
    .returning('id')
}
