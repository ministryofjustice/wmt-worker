// Defines a list of tasks and the tasks that they set off

module.exports = {
  'CREATE-WORKLOAD': 'PROCESS-REDUCTIONS',
  'PROCESS-REDUCTIONS': 'PROCESS-ADJUSTMENTS',
  'PROCESS-ADJUSTMENTS': 'CALCULATE-WORKLOAD-POINTS',
  'CREATE-COURT-REPORTS': 'PROCESS-REDUCTIONS-COURT-REPORTERS',
  'PROCESS-REDUCTIONS-COURT-REPORTERS': 'COURT-REPORTS-CALCULATION'
}