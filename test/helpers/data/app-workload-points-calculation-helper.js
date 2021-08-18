const knex = require('../../../knex').appSchema
const workloadHelper = require('./app-workload-helper')
const workloadPointsHelper = require('./app-workload-points-helper')
const reductionsHelper = require('./app-reductions-helper')
const adjustmentsHelper = require('./app-adjustments-helper')

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
  const promise = workloadHelper.insertDependencies(inserts)
    .then(function (inserts) {
      const workloadPoints = workloadPointsHelper.getWorkloadPoints()
      return knex('workload_points').withSchema('app').returning('id').insert(workloadPoints)
        .then(function (ids) {
          ids.forEach((id) => {
            inserts.push({ table: 'workload_points', id: id })
          })
        })
    })
    .then(function (ids) {
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const reductions = reductionsHelper.getReductionObjects(workloadOwnerId)
      return knex('reductions').withSchema('app').returning('id').insert(reductions)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'reductions', id: id })
      })
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const adjustments = adjustmentsHelper.getAdjustmentObjects(workloadOwnerId)
      return knex('adjustments').withSchema('app').returning('id').insert(adjustments)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'adjustments', id: id })
      })

      return inserts
    })

  return promise
}

module.exports.addWorkload = function (inserts) {
  const defaultWorkload = {
    total_cases: 8,
    total_filtered_cases: 7,
    total_custody_cases: 1,
    total_community_cases: 2,
    total_license_cases: 3,
    total_filtered_custody_cases: 0,
    total_filtered_community_cases: 1,
    total_filtered_license_cases: 2,
    total_t2a_cases: 9,
    total_t2a_custody_cases: 2,
    total_t2a_community_cases: 3,
    total_t2a_license_cases: 4,
    monthly_sdrs: 4,
    sdr_due_next_30_days: 5,
    sdr_conversions_last_30_days: 6,
    paroms_completed_last_30_days: 7,
    paroms_due_next_30_days: 8,
    license_last_16_weeks: 9,
    community_last_16_weeks: 10,
    arms_community_cases: 11,
    arms_license_cases: 12,
    workload_report_id: inserts.find((item) => item.table === 'workload_report').id
  }

  const workloads = [
    Object.assign({}, defaultWorkload, { total_cases: 20, total_filtered_cases: 19, total_t2a_cases: 10, staging_id: 1, workload_owner_id: inserts.find((item) => item.table === 'workload_owner').id })

  ]

  return knex('workload').withSchema('app').returning('id').insert(workloads).then(function (id) {
    inserts.push({ table: 'workload', id: id[0] })
    return inserts
  })
}

module.exports.addWorkloadPointsCalculation = function (inserts) {
  const workloadPointsCalculation = Object.assign({}, module.exports.defaultWorkloadPointsCalculation,
    {
      workload_report_id: inserts.filter((item) => item.table === 'workload_report')[0].id,
      workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
      workload_id: inserts.filter((item) => item.table === 'workload')[0].id
    }
  )
  return knex('workload_points_calculations').withSchema('app').returning('id').insert(workloadPointsCalculation)
    .then(function (ids) {
      inserts.push({ table: 'workload_points_calculations', id: ids[0] })
      return inserts
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  const groupedDeletions = [{ table: inserts[0].table, id: [inserts[0].id] }]

  for (let i = 1; i < inserts.length; i++) {
    if (inserts[i].table === groupedDeletions[groupedDeletions.length - 1].table) {
      groupedDeletions[groupedDeletions.length - 1].id.push(inserts[i].id)
    } else {
      groupedDeletions.push({ table: inserts[i].table, id: [inserts[i].id] })
    }
  }

  return groupedDeletions.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', deletion.id).del()
  }).reduce(function (prev, current) {
    return prev.then(function () {
      return current
    })
  }, Promise.resolve())
}
