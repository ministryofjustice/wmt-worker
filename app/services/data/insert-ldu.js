const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const lduTable = `${config.DB_APP_SCHEMA}.ldu`

module.exports = function (ldu) {
  var lduId
  knex.select().from(lduTable)
    .where('ldu_code', ldu.lduCode)
    .first()
    .then(function (result) {
      if (result === 'undefined') {
        knex(lduTable)
          .insert(ldu)
          .returning('id')
          .then(function (id) {
            lduId = id
          })
      } else {
        lduId = result['id']
      }
      return lduId
    })
}
