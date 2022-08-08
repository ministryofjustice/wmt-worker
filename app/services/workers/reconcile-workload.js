const getWmtPeriod = require('../helpers/get-wmt-period')
const getLatestRealtimeWorkloadCalculations = require('../data/get-latest-realtime-workload-calculations')
const getLatestBatchWorkloadCalculation = require('../data/get-latest-batch-workload-calculation')
const log = require('../log')
const { arrayToPromise } = require('../helpers/promise-helper')
const Task = require('../domain/task')
const createNewTasks = require('../data/create-tasks')
const { REFRESH_VIEWS } = require('../../constants/task-type')
const { WORKER } = require('../../constants/task-submitting-agent')
const { PENDING } = require('../../constants/task-status')

module.exports.execute = async function (task) {
  const previousDay = new Date()
  previousDay.setDate(previousDay.getDate() - 1)
  const previousDayWmtPeriod = getWmtPeriod(previousDay)
  return getLatestRealtimeWorkloadCalculations(previousDayWmtPeriod).then(function (results) {
    return arrayToPromise(results, function (realtimeWorkload) {
      return getLatestBatchWorkloadCalculation(realtimeWorkload.teamCode, realtimeWorkload.staffCode, task.workloadReportId).then(function ([batchWorkloadResult]) {
        const batchWorkload = batchWorkloadResult ?? { availablePoints: -1, totalPoints: -1 }
        if (batchWorkload.availablePoints === realtimeWorkload.availablepoints && batchWorkload.totalPoints === realtimeWorkload.workloadPoints) {
          log.trackSameWorkload(realtimeWorkload)
        } else {
          log.trackDifferentWorkload(realtimeWorkload, batchWorkload)
        }
      })
    })
  }).then(function () {
    const refreshViewsTask = new Task(
      undefined,
      WORKER,
      REFRESH_VIEWS,
      undefined,
      task.workloadReportId,
      undefined,
      undefined,
      PENDING
    )
    return createNewTasks([refreshViewsTask])
  })
}
