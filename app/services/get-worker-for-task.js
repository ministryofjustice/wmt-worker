const taskTypes = require('../constants/task-type')
const calculateWorkloadPoints = require('./workers/calculate-workload-points')
const processImport = require('./workers/process-import')
const createWorkload = require('./workers/create-workload')
const reductionsWorker = require('./workers/reductions-worker')
const reductionsWorkerCourtReporters = require('./workers/court-reporters-reductions-worker')
const adjustmentsWorker = require('./workers/adjustments-worker')
const createCourtReports = require('./workers/create-court-reports')
const courtReportsCalculation = require('./workers/court-reports-calculations')
const createTasksForMissing = require('./workers/create-tasks-for-missing')
const generateDashboard = require('./workers/generate-dashboard')
const removeDuplicates = require('./workers/remove-duplicates')
const checkForMissingDivisions = require('./workers/check-for-missing-divisions')
const createOmicWorkload = require('./workers/create-omic-workload')
const calculateOmicWorkloadPoints = require('./workers/calculate-omic-workload-points')
const migrateReductions = require('./workers/migrate-reductions')
const migrateContractedHours = require('./workers/migrate-contracted-hours')
const recalculateWorkloadPoints = require('./workers/recalculate-workload-points')
const importReductionsAndContractedHours = require('./workers/import-reductions-and-contracted-hours')
const restructureOffenderManagers = require('./workers/restructure-offender-managers')
// ALL WORKERS SHOULD HAVE A METHOD `execute(task)` that returns a Promise
module.exports = function (taskType) {
  switch (taskType) {
    case taskTypes.CALCULATE_WORKLOAD_POINTS: return calculateWorkloadPoints
    case taskTypes.PROCESS_IMPORT: return processImport
    case taskTypes.CREATE_WORKLOAD: return createWorkload
    case taskTypes.PROCESS_REDUCTIONS: return reductionsWorker
    case taskTypes.PROCESS_REDUCTIONS_COURT_REPORTERS: return reductionsWorkerCourtReporters
    case taskTypes.PROCESS_ADJUSTMENTS: return adjustmentsWorker
    case taskTypes.CREATE_COURT_REPORTS: return createCourtReports
    case taskTypes.COURT_REPORTS_CALCULATION: return courtReportsCalculation
    case taskTypes.CREATE_TASKS_FOR_MISSING: return createTasksForMissing
    case taskTypes.GENERATE_DASHBOARD: return generateDashboard
    case taskTypes.REMOVE_DUPLICATES: return removeDuplicates
    case taskTypes.CHECK_FOR_MISSING_DIVISIONS: return checkForMissingDivisions
    case taskTypes.MIGRATE_REDUCTIONS: return migrateReductions
    case taskTypes.MIGRATE_CONTRACTED_HOURS: return migrateContractedHours
    case taskTypes.CREATE_OMIC_WORKLOAD: return createOmicWorkload
    case taskTypes.CALCULATE_OMIC_WORKLOAD_POINTS: return calculateOmicWorkloadPoints
    case taskTypes.RECALCULATE_WORKLOAD_POINTS: return recalculateWorkloadPoints
    case taskTypes.IMPORT_REDUCTIONS_AND_CONTRACTED_HOURS: return importReductionsAndContractedHours
    case taskTypes.RESTRUCTURE_OFFENDER_MANAGER: return restructureOffenderManagers
  }

  return null
}
