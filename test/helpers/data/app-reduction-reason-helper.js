const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
var Promise = require('bluebird').Promise

const testReductionReason = {
  reason: 'Test Reason',
  reason_short_name: 'Test',
  category_id: 1
}
var inserts = []

module.exports.insertDependencies = function (workloadOwnerId) {
  return knex('reduction_reason')
  .insert(testReductionReason)
  .returning('id')
  .then(function (id) {
    inserts.push({ table: 'reduction_reason', id: id[0] })
    return inserts
  })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
