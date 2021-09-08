const knex = require('../../../knex').appSchema
const { arrayToPromise } = require('../helpers/promise-helper')
const log = require('../log')

module.exports = function (contactId) {
  return knex.select(knex.raw('count(*) AS theCount'), 'contact_id AS contactId', 'workload_owner_id AS workloadOwnerId', 'points')
    .from('adjustments')
    .withSchema('app')
    .where('contact_id', contactId)
    .groupBy('contact_id', 'workload_owner_id', 'points')
    .having(knex.raw('count(*)'), '>', 1)
    .then(function (results) {
      return arrayToPromise(results, function (result) {
        const count = result.theCount - 1
        log.info('Deleting ' + count + ' adjustments for contact ' + result.contactId + ' and  workload owner ' + result.workloadOwnerId + ' and points ' + result.points)

        return knex.schema.raw('DELETE TOP (' + count + ') FROM app.adjustments WHERE contact_id = ' + result.contactId + ' AND workload_owner_id = ' + result.workloadOwnerId + ' AND points = ' + result.points)
      })
    })
}
