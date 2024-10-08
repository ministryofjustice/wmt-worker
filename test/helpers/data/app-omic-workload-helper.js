const knex = require('../../../knex').appSchema
const Locations = require('../../../app/services/probation-rules').Locations

module.exports.insertDependencies = function (inserts) {
  const promise = knex('workload_report').withSchema('app').returning('id').insert({})
    .then(function ([ids]) {
      inserts.push({ table: 'workload_report', id: ids.id })
      return knex('offender_manager_type').withSchema('app').returning('id').insert({ description: 'test' })
    })
    .then(function ([ids]) {
      inserts.push({ table: 'offender_manager_type', id: ids.id })
      return knex('offender_manager').withSchema('app').returning('id').insert({ type_id: ids.id })
    })
    .then(function ([ids]) {
      inserts.push({ table: 'offender_manager', id: ids.id })
      return knex('region').withSchema('app').returning('id').insert({})
    })
    .then(function ([ids]) {
      inserts.push({ table: 'region', id: ids.id })
      return knex('ldu').withSchema('app').returning('id').insert({ region_id: ids.id })
    })
    .then(function ([ids]) {
      inserts.push({ table: 'ldu', id: ids.id })
      return knex('team').withSchema('app').returning('id').insert({ ldu_id: ids.id })
    })
    .then(function ([ids]) {
      inserts.push({ table: 'team', id: ids.id })

      const offenderManagers = inserts.filter((item) => item.table === 'offender_manager')
      const defaultWorkloadOwner = { team_id: inserts.filter((item) => item.table === 'team')[0].id, contracted_hours: 40, offender_manager_id: offenderManagers[0].id }

      const workloadOwners = [
        defaultWorkloadOwner,
        defaultWorkloadOwner,
        defaultWorkloadOwner
      ]

      return knex('workload_owner').withSchema('app').returning('id').insert(workloadOwners)
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'workload_owner', id })
      })

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
        workload_report_id: inserts.filter((item) => item.table === 'workload_report')[0].id
      }

      const workloads = [
        Object.assign({}, defaultWorkload, { total_cases: 20, total_filtered_cases: 19, total_t2a_cases: 10, staging_id: 1, workload_owner_id: ids[0].id }),
        Object.assign({}, defaultWorkload, { total_cases: 30, total_filtered_cases: 29, total_t2a_cases: 15, staging_id: 2, workload_owner_id: ids[1].id }),
        Object.assign({}, defaultWorkload, { total_cases: 30, total_filtered_cases: 17, total_t2a_cases: 20, staging_id: 3, workload_owner_id: ids[2].id })
      ]

      return knex('omic_workload').withSchema('app').returning('id').insert(workloads)
    })
    .then(function (ids) {
      const locations = [Locations.COMMUNITY, Locations.CUSTODY, Locations.LICENSE]
      const cases = []
      ids.forEach(({ id }) => {
        inserts.push({ table: 'omic_workload', id })
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 33; j++) {
            cases.push({
              omic_workload_id: id,
              tier_number: j,
              overdue_terminations_total: 1,
              warrants_total: 1,
              unpaid_work_total: 1,
              total_cases: j + i,
              t2a_overdue_terminations_total: 1,
              t2a_warrants_total: 1,
              t2a_unpaid_work_total: 1,
              t2a_total_cases: 10,
              suspended_total: 1,
              location: locations[i],
              suspended_lifer_total: 99,
              total_filtered_cases: Math.max(0, j + i - 1)
            })
          }
        }
      })
      return knex.batchInsert('app.omic_tiers', cases, 149).returning('id')
    })
    .then(function (ids) {
      ids.forEach(({ id }) => {
        inserts.push({ table: 'omic_tiers', id })
      })
      return inserts
    })

  return promise
}
