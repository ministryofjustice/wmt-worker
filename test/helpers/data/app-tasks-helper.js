const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
var Promise = require('bluebird').Promise

module.exports.insertDependencies = function (inserts) {
  return knex('workload_report').returning('id').insert({})
  .then(function (ids) {
    inserts.push({table: 'workload_report', id: ids[0]})
    return knex('workload_report').returning('id').insert({})
  })
  .then(function (ids) {
    inserts.push({table: 'workload_report', id: ids[0]})

    var workloadReports = inserts.filter((item) => item.table === 'workload_report')

    var tasks = []
    tasks.push({workload_report_id: workloadReports[0].id, type: 'CREATE-WORKLOAD', status: 'Status 1'})
    tasks.push({workload_report_id: workloadReports[0].id, type: 'PROCESS-IMPORT', status: 'Status 2'})
    tasks.push({workload_report_id: workloadReports[0].id, type: 'CREATE-WORKLOAD', status: 'Status 3'})
    tasks.push({workload_report_id: workloadReports[1].id, type: 'CREATE-WORKLOAD', status: 'Status 4'})

    return knex('tasks').returning('id').insert(tasks)
  })
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'tasks', id: id})
    })
    return inserts
  })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
