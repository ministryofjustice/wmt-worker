const knex = require('../../../knex').appSchema

module.exports = function (wmtPeriod) {
  const selectColumns = [
    knex.raw('DISTINCT ON (staff_code) available_points as availablePoints'),
    'workload_points as workloadPoints',
    'staff_code as staffCode',
    'team_code as teamCode'
  ]

  return knex('workload_calculation')
    .withSchema('public')
    .select(selectColumns)
    .whereBetween('calculated_date', [wmtPeriod.startOfPeriod, wmtPeriod.endOfPeriod])
    .orderBy(['staff_code', { column: 'calculated_date', order: 'desc' }])
}
