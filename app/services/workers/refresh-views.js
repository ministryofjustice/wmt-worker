const refreshMaterializedViews = require('../data/refresh-materialized-views')

const Task = require('../domain/task')
const createNewTasks = require('../data/create-tasks')
const { WORKER } = require('../../constants/task-submitting-agent')
const { GENERATE_DASHBOARD } = require('../../constants/task-type')
const { PENDING } = require('../../constants/task-status')

module.exports.execute = async function (task) {
  return refreshMaterializedViews()
    .then(function () {
      return createNewTasks([new Task(
        undefined,
        WORKER,
        GENERATE_DASHBOARD,
        undefined,
        task.workloadReportId,
        undefined,
        undefined,
        PENDING
      )])
    })
}
