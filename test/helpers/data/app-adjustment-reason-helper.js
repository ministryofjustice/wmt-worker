const knex = require('../../../knex').appSchema

const testAdjustmentReason = {
  contact_description: 'Test Reason',
  contact_code: 'TST',
  category_id: 1,
  points: 10
}

module.exports.insertDependencies = function () {
  const inserts = []
  return knex('adjustment_reason')
    .withSchema('app')
    .insert(testAdjustmentReason)
    .returning('id')
    .then(function ([id]) {
      inserts.push({ table: 'adjustment_reason', id, data: { ...testAdjustmentReason, id } })
      return inserts
    })
}
