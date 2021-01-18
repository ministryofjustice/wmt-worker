const tableName = 'case_details'

const caseDetailsRow = {
  workload_id: 1,
  row_type: 'U',
  case_ref_no: 'CRN_1',
  tier_code: 1,
  team_code: 'WMT',
  grade_code: 'PSO',
  location: 'COMMUNITY'
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('workload').select('id')
    })
    .then(function (workloadIds) {
      let i = 1
      let caseDetailsToInsert
      for (let idx = 0; idx < workloadIds.length; idx++, i++) {
        caseDetailsToInsert = []
        caseDetailsToInsert.push(Object.assign({}, caseDetailsRow, { workload_id: workloadIds[idx].id, tier_code: i % 7 }))
        caseDetailsToInsert.push(Object.assign({}, caseDetailsRow, { workload_id: workloadIds[idx].id, tier_code: i % 7, row_type: 'O' }))
      }
      return knex(tableName).insert(caseDetailsToInsert)
    })
}
