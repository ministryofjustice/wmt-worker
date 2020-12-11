const knex = require('../../../knex').appSchema
const Promise = require('bluebird').Promise

const testAdjustmentReason = {
  contact_description: 'Test Reason',
  contact_code: 'TST',
  category_id: 1
}
const inserts = []

module.exports.insertDependencies = function (workloadOwnerId) {
  return knex('adjustment_reason')
    .insert(testAdjustmentReason)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: 'adjustment_reason', id: id[0] })
      return inserts
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
