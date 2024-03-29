const knex = require('../../../knex').appSchema
const lduTable = 'ldu'
const updateLDU = require('./update-ldu')

module.exports = function (ldu) {
  let lduId

  const lduDbObject = {}
  lduDbObject.region_id = ldu.regionId
  lduDbObject.code = ldu.code
  lduDbObject.description = ldu.description
  lduDbObject.effective_from = ldu.effectiveFrom
  lduDbObject.effective_to = ldu.effectiveTo

  return knex.select().from(lduTable).withSchema('app')
    .where('code', lduDbObject.code)
    .first()
    .then(function (result) {
      if (result === undefined) {
        return knex(lduTable).withSchema('app')
          .insert(lduDbObject)
          .returning('id').then(function (results) {
            return results.map((result) => result.id)
          })
      } else {
        // check if ldu name is still the same
        // if it isn't, update
        if (result.description !== lduDbObject.description || result.region_id !== lduDbObject.region_id) {
          return updateLDU(lduDbObject)
            .then(function (id) {
              return id
            })
        }
        lduId = result.id
      }
      return lduId
    })
}
