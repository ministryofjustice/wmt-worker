const knex = require('../../../knex').appSchema

module.exports = function (grade) {
  let select = ''
  const selectAlias = ' AS defaultContractedHours'
  switch (grade) {
    case 'PO':
    case 'TPO':
      select = 'default_contracted_hours_po'
      break
    case 'SPO':
    case 'DMY':
      select = 'default_contracted_hours_spo'
      break
    case 'PSO':
      select = 'default_contracted_hours_pso'
      break
    default:
      select = 'default_contracted_hours_spo'
      break
  }

  return knex('workload_points').withSchema('app')
    .whereNull('workload_points.effective_to')
    .andWhere('is_t2a', false)
    .first(select + selectAlias)
    .then((result) => {
      let hours = result.defaultContractedHours
      if (hours === null) {
        hours = 0
      }
      return hours
    })
}
