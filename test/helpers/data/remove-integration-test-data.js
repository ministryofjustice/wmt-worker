const knexApp = require('../../../knex').appSchema
const deleteStagingRecords = require('./delete-staging-records')

module.exports = function () {
  return Promise.all([
    knexApp('tasks').withSchema('app').truncate(),
    knexApp('adjustments').withSchema('app').truncate(),
    knexApp('tiers').withSchema('app').truncate(),
    knexApp('omic_case_details').withSchema('app').truncate(),
    knexApp('omic_tiers').withSchema('app').truncate(),
    knexApp('omic_workload_points_calculations').withSchema('app').truncate(),
    knexApp('case_details').withSchema('app').truncate(),
    knexApp('reductions_history').withSchema('app').truncate(),
    knexApp('court_reports_calculations').withSchema('app').truncate(),
    knexApp('workload_points_calculations').withSchema('app').truncate(),
    knexApp('export_file').withSchema('app').truncate()
  ]).then(function () {
    return Promise.all([
      knexApp('workload').withSchema('app').del(),
      knexApp('workload_report').withSchema('app').del(),
      knexApp('reductions').withSchema('app').del(),
      knexApp('workload_report').withSchema('app').del(),
      knexApp('court_reports').withSchema('app').del(),
      knexApp('workload_report').withSchema('app').del(),
      knexApp('omic_workload').withSchema('app').del()
    ])
  }).then(function () { return knexApp('workload_owner').withSchema('app').del() })
    .then(function () { return knexApp('offender_manager').withSchema('app').del() })
    .then(function () { return knexApp('team').withSchema('app').del() })
    .then(function () { return knexApp('ldu').withSchema('app').del() })
    .then(function () { return knexApp('region').withSchema('app').del() })
    .then(function () { return deleteStagingRecords() })
}
