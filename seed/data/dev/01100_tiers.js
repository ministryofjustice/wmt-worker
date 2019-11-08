const locations = require('wmt-probation-rules').Locations
var tableName = 'tiers'
var insertData = []

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('workload').select('id'))
    .then(function (workloads) {
      workloads.forEach(function (workload) {
        insertData.push(
          { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 0, unpaid_work_total: 0, warrants_total: 0, total_cases: 0, t2a_overdue_terminations_total: 0, t2a_unpaid_work_total: 3, t2a_warrants_total: 3, t2a_total_cases: 2, suspended_total: 2, suspended_lifer_total: 2, total_filtered_cases: 0, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, t2a_overdue_terminations_total: 0, t2a_unpaid_work_total: 0, t2a_warrants_total: 3, t2a_total_cases: 3, suspended_total: 2, suspended_lifer_total: 2, total_filtered_cases: 0, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 1, t2a_unpaid_work_total: 0, t2a_warrants_total: 0, t2a_total_cases: 3, suspended_total: 3, suspended_lifer_total: 3, total_filtered_cases: 1, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, t2a_overdue_terminations_total: 1, t2a_unpaid_work_total: 1, t2a_warrants_total: 0, t2a_total_cases: 0, suspended_total: 3, suspended_lifer_total: 3, total_filtered_cases: 2, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 2, t2a_unpaid_work_total: 1, t2a_warrants_total: 1, t2a_total_cases: 0, suspended_total: 0, suspended_lifer_total: 0, total_filtered_cases: 1, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, t2a_overdue_terminations_total: 2, t2a_unpaid_work_total: 2, t2a_warrants_total: 1, t2a_total_cases: 1, suspended_total: 0, suspended_lifer_total: 0, total_filtered_cases: 3, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 6, t2a_overdue_terminations_total: 3, t2a_unpaid_work_total: 2, t2a_warrants_total: 2, t2a_total_cases: 1, suspended_total: 1, suspended_lifer_total: 1, total_filtered_cases: 5, location: locations.COMMUNITY },
          { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 0, total_cases: 3, t2a_overdue_terminations_total: 4, t2a_unpaid_work_total: 3, t2a_warrants_total: 2, t2a_total_cases: 2, suspended_total: 1, suspended_lifer_total: 1, total_filtered_cases: 2, location: locations.COMMUNITY }
        )
        insertData.push(
          { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 0, unpaid_work_total: 1, warrants_total: 0, total_cases: 1, t2a_overdue_terminations_total: 0, t2a_unpaid_work_total: 3, t2a_warrants_total: 3, t2a_total_cases: 2, suspended_total: 2, suspended_lifer_total: 2, total_filtered_cases: 0, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, t2a_overdue_terminations_total: 0, t2a_unpaid_work_total: 0, t2a_warrants_total: 3, t2a_total_cases: 3, suspended_total: 2, suspended_lifer_total: 2, total_filtered_cases: 0, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 1, t2a_unpaid_work_total: 0, t2a_warrants_total: 0, t2a_total_cases: 3, suspended_total: 3, suspended_lifer_total: 3, total_filtered_cases: 1, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, t2a_overdue_terminations_total: 1, t2a_unpaid_work_total: 1, t2a_warrants_total: 0, t2a_total_cases: 0, suspended_total: 3, suspended_lifer_total: 3, total_filtered_cases: 2, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 2, t2a_unpaid_work_total: 1, t2a_warrants_total: 1, t2a_total_cases: 0, suspended_total: 0, suspended_lifer_total: 0, total_filtered_cases: 1, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, t2a_overdue_terminations_total: 2, t2a_unpaid_work_total: 2, t2a_warrants_total: 1, t2a_total_cases: 1, suspended_total: 0, suspended_lifer_total: 0, total_filtered_cases: 3, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 6, t2a_overdue_terminations_total: 3, t2a_unpaid_work_total: 2, t2a_warrants_total: 2, t2a_total_cases: 1, suspended_total: 1, suspended_lifer_total: 1, total_filtered_cases: 5, location: locations.CUSTODY },
          { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 1, total_cases: 4, t2a_overdue_terminations_total: 4, t2a_unpaid_work_total: 3, t2a_warrants_total: 2, t2a_total_cases: 2, suspended_total: 1, suspended_lifer_total: 1, total_filtered_cases: 3, location: locations.CUSTODY }
        )
        insertData.push(
          { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 0, unpaid_work_total: 2, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 0, t2a_unpaid_work_total: 3, t2a_warrants_total: 3, t2a_total_cases: 2, suspended_total: 2, suspended_lifer_total: 2, total_filtered_cases: 1, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, t2a_overdue_terminations_total: 0, t2a_unpaid_work_total: 0, t2a_warrants_total: 3, t2a_total_cases: 3, suspended_total: 2, suspended_lifer_total: 2, total_filtered_cases: 0, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 1, t2a_unpaid_work_total: 0, t2a_warrants_total: 0, t2a_total_cases: 3, suspended_total: 3, suspended_lifer_total: 3, total_filtered_cases: 1, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, t2a_overdue_terminations_total: 1, t2a_unpaid_work_total: 1, t2a_warrants_total: 0, t2a_total_cases: 0, suspended_total: 3, suspended_lifer_total: 3, total_filtered_cases: 2, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, t2a_overdue_terminations_total: 2, t2a_unpaid_work_total: 1, t2a_warrants_total: 1, t2a_total_cases: 0, suspended_total: 1, suspended_lifer_total: 0, total_filtered_cases: 0, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, t2a_overdue_terminations_total: 2, t2a_unpaid_work_total: 2, t2a_warrants_total: 1, t2a_total_cases: 1, suspended_total: 3, suspended_lifer_total: 0, total_filtered_cases: 0, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 6, t2a_overdue_terminations_total: 3, t2a_unpaid_work_total: 2, t2a_warrants_total: 2, t2a_total_cases: 1, suspended_total: 5, suspended_lifer_total: 1, total_filtered_cases: 0, location: locations.LICENSE },
          { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 2, total_cases: 5, t2a_overdue_terminations_total: 4, t2a_unpaid_work_total: 3, t2a_warrants_total: 2, t2a_total_cases: 2, suspended_total: 4, suspended_lifer_total: 1, total_filtered_cases: 0, location: locations.LICENSE }
        )
      })

      // Need to split the array into 16 as one query caused an error with too many parameters in one request (2100)
      // var splitSize = insertData.length / 16

      // var partOne = insertData.slice(0, splitSize)
      // var partTwo = insertData.slice(splitSize, splitSize * 2)
      // var partThree = insertData.slice(splitSize * 2, splitSize * 3)
      // var partFour = insertData.slice(splitSize * 3, splitSize * 4)
      // var partFive = insertData.slice(splitSize * 4, splitSize * 5)
      // var partSix = insertData.slice(splitSize * 5, splitSize * 6)
      // var partSeven = insertData.slice(splitSize * 6, splitSize * 7)
      // var partEight = insertData.slice(splitSize * 7, splitSize * 8)
      // var partNine = insertData.slice(splitSize * 8, splitSize * 9)
      // var partTen = insertData.slice(splitSize * 9, splitSize * 10)
      // var partEleven = insertData.slice(splitSize * 10, splitSize * 11)
      // var partTwelve = insertData.slice(splitSize * 11, splitSize * 12)
      // var partThirteen = insertData.slice(splitSize * 12, splitSize * 13)
      // var partFourteen = insertData.slice(splitSize * 13, splitSize * 14)
      // var partFifteen = insertData.slice(splitSize * 14, splitSize * 15)
      // var partSixteen = insertData.slice(splitSize * 15, insertData.length)

      return knex.batchInsert(tableName, insertData, 100)
    })
}
