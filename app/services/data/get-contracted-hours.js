const knex = require('../../../knex').appSchema

module.exports = function (workloadOwnerId) {
  return knex('workload_owner').withSchema('app')
    .crossJoin('workload_points')
    .whereNull('workload_points.effective_to')
    .andWhere('workload_owner.id', workloadOwnerId)
    .andWhere('is_t2a', false)
    .first('workload_owner.contracted_hours AS contracted_hours',
      'workload_points.default_contracted_hours_po AS default_hours'
    )
    .then((result) => {
      let hours = result.contracted_hours
      if (hours === null) {
        hours = result.default_hours
      }
      return hours
    })
}
