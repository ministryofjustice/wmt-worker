const knex = require('../../../knex').appSchema
const { PENDING } = require('../../../app/constants/task-status')

module.exports.insertDependencies = function (inserts) {
  return knex('workload_report').withSchema('app').returning('id').insert({})
    .then(function (ids) {
      inserts.push({ table: 'workload_report', id: ids[0] })
      return knex('workload_report').withSchema('app').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({ table: 'workload_report', id: ids[0] })

      const workloadReports = inserts.filter((item) => item.table === 'workload_report')

      const tasks = []
      tasks.push({ workload_report_id: workloadReports[0].id, type: 'CREATE-WORKLOAD', status: 'Status 1' })
      tasks.push({ workload_report_id: workloadReports[0].id, type: 'PROCESS-IMPORT', status: 'Status 2' })
      tasks.push({ workload_report_id: workloadReports[0].id, type: 'CREATE-WORKLOAD', status: 'Status 3' })
      tasks.push({ workload_report_id: workloadReports[1].id, type: 'CREATE-WORKLOAD', status: 'Status 4' })

      return knex('tasks').withSchema('app').returning('id').insert(tasks)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'tasks', id })
      })
      return inserts
    })
}

module.exports.findAllPendingTasks = function () {
  return knex('tasks').withSchema('app').where('status', PENDING)
}
