const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const lduTable = `${config.DB_APP_SCHEMA}.ldu`

module.exports = function (ldu) {
  var lduId

  var lduDbObject = {}
  lduDbObject.region_id = ldu.regionId
  lduDbObject.code = ldu.code
  lduDbObject.description = ldu.description
  lduDbObject.effective_from = ldu.effectiveFrom
  lduDbObject.effective_to = ldu.effectiveTo

  return knex.select().from(lduTable)
    .where('code', lduDbObject.code)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(lduTable)
          .insert(lduDbObject)
          .returning('id')
      } else {
        lduId = result['id']
      }
      return lduId
    })
}
