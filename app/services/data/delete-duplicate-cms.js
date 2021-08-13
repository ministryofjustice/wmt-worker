const knex = require('../../../knex').appSchema

module.exports = function (contactId) {
  return knex.schema.raw('SELECT count(*) AS theCount, contact_id AS contactId, workload_owner_id AS workloadOwnerId, points FROM app.adjustments WHERE contact_id = ' + contactId + ' GROUP BY contact_id, workload_owner_id, points HAVING count(*) > 1')
    .then(function (results) {
      return Promise.all(results.map(function (result) {
        let count = 0
        count = result.theCount - 1
        return knex.schema.raw('DELETE TOP (' + count + ') FROM app.adjustments WHERE contact_id = ' + result.contactId + ' AND workload_owner_id = ' + result.workloadOwnerId + ' AND points = ' + result.points)
      }))
    })
}
