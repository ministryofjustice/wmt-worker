const knex = require('../../../knex').appSchema
const workloadHelper = require('./app-workload-helper')
const workloadPointsHelper = require('./app-workload-points-helper')
const reductionsHelper = require('./app-reductions-helper')
const adjustmentsHelper = require('./app-adjustments-helper')
const getWmtPeriod = require('../../../app/services/helpers/get-wmt-period')

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

module.exports.insertMatchedWorkloadCalculations = function (inserts) {
  const matchedInserts = []
  const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
  const offenderManagerTypeId = inserts.filter((item) => item.table === 'offender_manager_type')[0].id
  const providerCode = inserts.filter((item) => item.table === 'ldu')[0].code
  const teamCode = inserts.filter((item) => item.table === 'team')[0].code
  const teamId = inserts.filter((item) => item.table === 'team')[0].id
  return knex('offender_manager').withSchema('app').returning('id').insert({ type_id: offenderManagerTypeId, forename: 'Offender', surname: 'Manager', key: 'OM567' })
    .then(function ([id]) {
      matchedInserts.push({ table: 'offender_manager', id, schema: 'app', code: 'OM567' })
      return knex('workload_owner').withSchema('app').returning('id').insert({ team_id: teamId, contracted_hours: 40, offender_manager_id: id })
    }).then(function ([id]) {
      matchedInserts.push({ table: 'workload_owner', id, schema: 'app' })
      const workload = {
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
        workload_report_id: workloadReportId,
        workload_owner_id: id,
        staging_id: 8
      }
      return knex('workload').withSchema('app').returning('id').insert(workload)
    }).then(function ([id]) {
      matchedInserts.push({ table: 'workload', id, schema: 'app' })

      const workloadPointsCalculation = Object.assign({}, module.exports.defaultWorkloadPointsCalculation,
        {
          workload_report_id: workloadReportId,
          workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
          workload_id: id,
          last_updated_on: new Date()
        }

      )
      return knex('workload_points_calculations').withSchema('app').returning('id').insert(workloadPointsCalculation)
    }).then(function ([id]) {
      matchedInserts.push({ table: 'workload_points_calculations', id, schema: 'app' })

      const offenderManagerCode = matchedInserts.filter((item) => item.table === 'offender_manager')[0].code
      const currentWmtPeriod = getWmtPeriod(new Date())
      const dateInPreviousWmtPeriod = currentWmtPeriod.startOfPeriod.minusMinutes(5)
      const workloadCalculationEntity = {
        weekly_hours: module.exports.defaultWorkloadPointsCalculation.contracted_hours,
        reductions: module.exports.defaultWorkloadPointsCalculation.reduction_hours,
        available_points: module.exports.defaultWorkloadPointsCalculation.available_points,
        workload_points: module.exports.defaultWorkloadPointsCalculation.total_points,
        staff_code: offenderManagerCode,
        team_code: teamCode,
        provider_code: providerCode,
        calculated_date: dateInPreviousWmtPeriod,
        breakdown_data: '{}'
      }
      return knex('workload_calculation').withSchema('public').returning('calculation_id').insert(workloadCalculationEntity)
        .then(function ([id]) {
          matchedInserts.push({ table: 'workload_calculation', id, schema: 'public', idColumn: 'calculation_id' })
          return matchedInserts
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
            inserts.push({ table: 'workload_points', id, schema: 'app' })
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
        inserts.push({ table: 'reductions', id, schema: 'app' })
      })
      const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      const adjustments = adjustmentsHelper.getAdjustmentObjects(workloadOwnerId)
      return knex('adjustments').withSchema('app').returning('id').insert(adjustments)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'adjustments', id, schema: 'app' })
      })

      return inserts
    })

  return promise
}

module.exports.insertRealtimeWorkload = function (offenderManagerCode, teamCode, providerCode) {
  const currentWmtPeriod = getWmtPeriod(new Date())
  const dateInPreviousWmtPeriod = currentWmtPeriod.startOfPeriod.minusMinutes(5)
  const workloadCalculationEntity = {
    weekly_hours: 20.0,
    reductions: 10.0,
    available_points: 1500,
    workload_points: 1350,
    staff_code: offenderManagerCode,
    team_code: teamCode,
    provider_code: providerCode,
    calculated_date: dateInPreviousWmtPeriod,
    breakdown_data: '{}'
  }
  return knex('workload_calculation').withSchema('public').returning('calculation_id').insert(workloadCalculationEntity)
    .then(function ([id]) {
      return [{ table: 'workload_calculation', id, schema: 'public', idColumn: 'calculation_id' }]
    })
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
      workload_id: inserts.filter((item) => item.table === 'workload')[0].id,
      last_updated_on: new Date()
    }
  )
  return knex('workload_points_calculations').withSchema('app').returning('id').insert(workloadPointsCalculation)
    .then(function (ids) {
      inserts.push({ table: 'workload_points_calculations', id: ids[0], value: workloadPointsCalculation, schema: 'app' })
      return inserts
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  const groupedDeletions = [{ table: inserts[0].table, id: [inserts[0].id], schema: inserts[0].schema ?? 'app', idColumn: inserts[0].idColumn ?? 'id' }]

  for (let i = 1; i < inserts.length; i++) {
    if (inserts[i].table === groupedDeletions[groupedDeletions.length - 1].table) {
      groupedDeletions[groupedDeletions.length - 1].id.push(inserts[i].id)
    } else {
      groupedDeletions.push({ table: inserts[i].table, id: [inserts[i].id], schema: inserts[i].schema ?? 'app', idColumn: inserts[i].idColumn ?? 'id' })
    }
  }

  return groupedDeletions.map((deletion) => {
    return knex(deletion.table).withSchema(deletion.schema).whereIn(deletion.idColumn, deletion.id).del()
  }).reduce(function (prev, current) {
    return prev.then(function () {
      return current
    })
  }, Promise.resolve())
}
