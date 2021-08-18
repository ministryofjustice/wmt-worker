const knex = require('../../../knex').appSchema

const testAdjustmentReason = {
  contact_description: 'Test Reason',
  contact_code: 'TST',
  category_id: 1
}
const inserts = []

module.exports.insertDependencies = function (workloadOwnerId) {
  return knex('adjustment_reason')
    .withSchema('app')
    .insert(testAdjustmentReason)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: 'adjustment_reason', id: id[0] })
      return inserts
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function(prev, current){
    return prev.then(function() {
      return current
    })
  }, Promise.resolve())
}
