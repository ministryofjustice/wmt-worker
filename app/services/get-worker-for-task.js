const taskTypes = require('../constants/task-type')
const calculateWorkloadPoints = require('./workers/calculate-workload-points')
const processImport = require('./workers/process-import')
const createWorkload = require('./workers/create-workload')
const adjustmentsWorker = require('./workers/adjustments-worker')
const createCourtReports = require('./workers/create-court-reports')
const courtReportsCalculation = require('./workers/court-reports-calculations')
const generateDashboard = require('./workers/generate-dashboard')
const createOmicWorkload = require('./workers/create-omic-workload')
const calculateOmicWorkloadPoints = require('./workers/calculate-omic-workload-points')
const recalculateWorkloadPoints = require('./workers/recalculate-workload-points')
const refreshViews = require('./workers/refresh-views')
const reconcileWorkload = require('./workers/reconcile-workload')
// ALL WORKERS SHOULD HAVE A METHOD `execute(task)` that returns a Promise
module.exports = function (taskType) {
  switch (taskType) {
    case taskTypes.CALCULATE_WORKLOAD_POINTS: return calculateWorkloadPoints
    case taskTypes.PROCESS_IMPORT: return processImport
    case taskTypes.CREATE_WORKLOAD: return createWorkload
    case taskTypes.PROCESS_ADJUSTMENTS: return adjustmentsWorker
    case taskTypes.CREATE_COURT_REPORTS: return createCourtReports
    case taskTypes.COURT_REPORTS_CALCULATION: return courtReportsCalculation
    case taskTypes.GENERATE_DASHBOARD: return generateDashboard
    case taskTypes.CREATE_OMIC_WORKLOAD: return createOmicWorkload
    case taskTypes.CALCULATE_OMIC_WORKLOAD_POINTS: return calculateOmicWorkloadPoints
    case taskTypes.RECALCULATE_WORKLOAD_POINTS: return recalculateWorkloadPoints
    case taskTypes.REFRESH_VIEWS: return refreshViews
    case taskTypes.RECONCILE_WORKLOAD: return reconcileWorkload
  }

  return null
}
