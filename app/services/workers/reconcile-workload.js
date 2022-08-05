const getWmtPeriod = require('../helpers/get-wmt-period')
const getLatestRealtimeWorkloadCalculations = require('../data/get-latest-realtime-workload-calculations')
const getLatestBatchWorkloadCalculation = require('../data/get-latest-batch-workload-calculation')
const log = require('../log')
const { arrayToPromise } = require('../helpers/promise-helper')

module.exports.execute = async function (task) {
  const previousDay = new Date()
  previousDay.setDate(previousDay.getDate() - 1)
  const previousDayWmtPeriod = getWmtPeriod(previousDay)
  return getLatestRealtimeWorkloadCalculations(previousDayWmtPeriod).then(function (results) {
    return arrayToPromise(results, function (realtimeWorkload) {
      return getLatestBatchWorkloadCalculation(realtimeWorkload.teamCode, realtimeWorkload.staffCode, task.workloadReportId).then(function ([batchWorkload]) {
        if (batchWorkload.availablePoints === realtimeWorkload.availablepoints && batchWorkload.totalPoints === realtimeWorkload.workloadPoints) {
          log.trackSameWorkload(realtimeWorkload)
        } else {
          log.trackDifferentWorkload(realtimeWorkload, batchWorkload)
        }
      })
    })
  })
}
