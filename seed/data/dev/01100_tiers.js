var tableName = 'tiers'
var insertData = []

exports.seed = function (knex, Promise) {
  var locations = ['COMMUNITY', 'CUSTODY', 'LICENSE']
  // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('workload').select('id'))
    .then(function (workloads) {
      workloads.forEach(function (workload) {
        locations.forEach(function (location) {
          insertData.push(
            { workload_id: workload.id, tier_number: 0, overdue_terminations_total: 0, unpaid_work_total: 0, warrants_total: 0, total_cases: 0, location: location },
            { workload_id: workload.id, tier_number: 1, overdue_terminations_total: 1, unpaid_work_total: 0, warrants_total: 0, total_cases: 1, location: location },
            { workload_id: workload.id, tier_number: 2, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 0, total_cases: 2, location: location },
            { workload_id: workload.id, tier_number: 3, overdue_terminations_total: 1, unpaid_work_total: 1, warrants_total: 1, total_cases: 3, location: location },
            { workload_id: workload.id, tier_number: 4, overdue_terminations_total: 2, unpaid_work_total: 0, warrants_total: 0, total_cases: 2, location: location },
            { workload_id: workload.id, tier_number: 5, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 0, total_cases: 4, location: location },
            { workload_id: workload.id, tier_number: 6, overdue_terminations_total: 2, unpaid_work_total: 2, warrants_total: 2, total_cases: 6, location: location },
            { workload_id: workload.id, tier_number: 7, overdue_terminations_total: 2, unpaid_work_total: 1, warrants_total: 0, total_cases: 3, location: location }
          )
        })
      })

      // Need to split the array into 16 as one query caused an error with too many parameters in one request (2100)
      var splitSize = insertData.length / 16

      var partOne = insertData.slice(0, splitSize)
      var partTwo = insertData.slice(splitSize, splitSize * 2)
      var partThree = insertData.slice(splitSize * 2, splitSize * 3)
      var partFour = insertData.slice(splitSize * 3, splitSize * 4)
      var partFive = insertData.slice(splitSize * 4, splitSize * 5)
      var partSix = insertData.slice(splitSize * 5, splitSize * 6)
      var partSeven = insertData.slice(splitSize * 6, splitSize * 7)
      var partEight = insertData.slice(splitSize * 7, splitSize * 8)
      var partNine = insertData.slice(splitSize * 8, splitSize * 9)
      var partTen = insertData.slice(splitSize * 9, splitSize * 10)
      var partEleven = insertData.slice(splitSize * 10, splitSize * 11)
      var partTwelve = insertData.slice(splitSize * 11, splitSize * 12)
      var partThirteen = insertData.slice(splitSize * 12, splitSize * 13)
      var partFourteen = insertData.slice(splitSize * 13, splitSize * 14)
      var partFifteen = insertData.slice(splitSize * 14, splitSize * 15)
      var partSixteen = insertData.slice(splitSize * 15, insertData.length - 1)

      return knex(tableName).insert(partOne)
        .then(function (results) {
          return knex(tableName).insert(partTwo)
            .then(function (results) {
              return knex(tableName).insert(partThree)
                .then(function (results) {
                  return knex(tableName).insert(partFour)
                })
                .then(function (results) {
                  return knex(tableName).insert(partFive)
                })
                .then(function (results) {
                  return knex(tableName).insert(partSix)
                })
                .then(function (results) {
                  return knex(tableName).insert(partSeven)
                })
                .then(function (results) {
                  return knex(tableName).insert(partEight)
                })
                .then(function (results) {
                  return knex(tableName).insert(partNine)
                })
                .then(function (results) {
                  return knex(tableName).insert(partTen)
                })
                .then(function (results) {
                  return knex(tableName).insert(partEleven)
                })
                .then(function (results) {
                  return knex(tableName).insert(partTwelve)
                })
                .then(function (results) {
                  return knex(tableName).insert(partThirteen)
                })
                .then(function (results) {
                  return knex(tableName).insert(partFourteen)
                })
                .then(function (results) {
                  return knex(tableName).insert(partFifteen)
                })
                .then(function (results) {
                  return knex(tableName).insert(partSixteen)
                })
            })
        })
    })
}
