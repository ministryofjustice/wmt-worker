var tableName = 'workload'

const workloadRow = {
  workload_owner_id: 1,
  total_cases: 69,
  total_filtered_cases: 50,
  total_t2a_cases: 59,
  monthly_sdrs: 1,
  sdr_due_next_30_days: 2,
  sdr_conversions_last_30_days: 1,
  total_community_cases: 21,
  total_custody_cases: 23,
  total_license_cases: 25,
  total_t2a_community_cases: 11,
  total_t2a_custody_cases: 13,
  total_t2a_license_cases: 15,
  arms_community_cases: 3,
  arms_license_cases: 4,
  paroms_completed_last_30_days: 1,
  paroms_due_next_30_days: 0,
  license_last_16_weeks: 7,
  community_last_16_weeks: 5
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  // var partOneWorkloads = []
  // var partTwoWorkloads = []
  // var partThreeWorkloads = []
  // var partFourWorkloads = []
  return knex(tableName).del()
    .then(function () {
      return knex('workload_owner').join('team', 'workload_owner.team_id', 'team.id')
      .select('workload_owner.id').whereNot('team.description', 'CR Team 1')
    })
    .then(function (workloadOwners) {
      var workloadsToInsert = []
      var stagingId = 1
      for (var workloadOwner in workloadOwners) {
        for (var i = 0; i < 5; i++) {
          workloadsToInsert.push(Object.assign({}, workloadRow, {workload_owner_id: workloadOwners[workloadOwner].id, staging_id: stagingId}))
          stagingId++
        }
      }
      // Need to split the array into 4 as one query caused an error with too many parameters in one request (2100)
      // var oneQuarterValue = workloadsToInsert.length / 4
      // var twoQuarterValue = oneQuarterValue * 2
      // var threeQuarterValue = oneQuarterValue * 3
      // partOneWorkloads = workloadsToInsert.slice(0, oneQuarterValue)
      // partTwoWorkloads = workloadsToInsert.slice(oneQuarterValue, twoQuarterValue)
      // partThreeWorkloads = workloadsToInsert.slice(twoQuarterValue, threeQuarterValue)
      // partFourWorkloads = workloadsToInsert.slice(threeQuarterValue, workloadsToInsert.length)
      return knex.batchInsert('workload', workloadsToInsert, 100)
    })
}
