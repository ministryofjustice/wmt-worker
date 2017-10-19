var taskTypes = require('../constants/task-type')
var calculateWorkloadPoints = require('./workers/calculate-workload-points')
var processImport = require('./workers/process-import')
var createWorkload = require('./workers/create-workload')
var reductionsWorker = require('./workers/reductions-worker')
var reductionsWorkerCourtReporters = require('./workers/court-reporters-reductions-worker')
var adjustmentsWorker = require('./workers/adjustments-worker')
var courtReportsCalculations = require('./workers/court-reports-calculations')

// ALL WORKERS SHOULD HAVE A METHOD `execute(task)` that returns a Promise
module.exports = function (taskType) {
  switch (taskType) {
    case taskTypes.CALCULATE_WORKLOAD_POINTS: return calculateWorkloadPoints
    case taskTypes.PROCESS_IMPORT: return processImport
    case taskTypes.CREATE_WORKLOAD: return createWorkload
    case taskTypes.PROCESS_REDUCTIONS: return reductionsWorker
    case taskTypes.PROCESS_REDUCTIONS_COURT_REPORTERS: return reductionsWorkerCourtReporters
    case taskTypes.PROCESS_ADJUSTMENTS: return adjustmentsWorker
    case taskType.COURT_REPORTS_CALCULATION: return courtReportsCalculations
  }

  return null
}
