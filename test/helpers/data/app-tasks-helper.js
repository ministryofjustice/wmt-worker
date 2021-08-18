const knex = require('../../../knex').appSchema

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
        inserts.push({ table: 'tasks', id: id })
      })
      return inserts
    })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return inserts.map((deletion) => {
    return knex(deletion.table).withSchema('app').whereIn('id', [deletion.id]).del()
  }).reduce(function(prev, current){
    return prev.then(function() {
      return current
    })
  }, Promise.resolve())
}
