var taskTypes = require('../constants/task-type')
var calculateWorkloadPoints = require('./workers/calculate-workload-points')
var processImport = require('./workers/process-import')

// ALL WORKERS SHOULD HAVE A METHOD `execute(task)` that returns a Promise
module.exports = function (taskType) {
  switch (taskType) {
    case taskTypes.CALCULATE_WORKLOAD_POINTS: return calculateWorkloadPoints
    case taskTypes.PROCESS_IMPORT: return processImport
  }

  return null
}
