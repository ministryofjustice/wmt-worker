const knex = require('../../../knex').appSchema
const omicWorkloadHelper = require('./app-omic-workload-helper')
const workloadPointsHelper = require('./app-workload-points-helper')

module.exports.defaultWorkloadPointsCalculation = {
  total_points: 99,
  sdr_points: 98,
  sdr_conversion_points: 97,
  paroms_points: 96,
  nominal_target: 95,
  available_points: 94,
  reduction_hours: 93,
  contracted_hours: 92
}

module.exports.insertDependenciesForUpdate = function (inserts) {
  return module.exports.insertDependencies(inserts)
    .then(function (inserts) {
      return module.exports.addWorkloadPointsCalculation(inserts)
        .then(function (inserts) {
          return inserts
        })
    })
}

module.exports.insertDependencies = function (inserts) {
  const promise = omicWorkloadHelper.insertDependencies(inserts)
    .then(function (inserts) {
      const workloadPoints = workloadPointsHelper.getWorkloadPoints()
      return knex('workload_points').withSchema('app').returning('id').insert(workloadPoints)
        .then(function (ids) {
          ids.forEach(({ id }) => {
            inserts.push({ table: 'workload_points', id })
          })
          return inserts
        })
    })

  return promise
}

module.exports.addWorkloadPointsCalculation = function (inserts) {
  const workloadPointsCalculation = Object.assign({}, module.exports.defaultWorkloadPointsCalculation,
    {
      workload_report_id: inserts.filter((item) => item.table === 'workload_report')[0].id,
      workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
      omic_workload_id: inserts.filter((item) => item.table === 'omic_workload')[0].id
    }
  )
  return knex('omic_workload_points_calculations').withSchema('app').returning('id').insert(workloadPointsCalculation)
    .then(function ([ids]) {
      inserts.push({ table: 'omic_workload_points_calculations', id: ids.id })
      return inserts
    })
}
