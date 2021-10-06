const recalculateWorkloadPoints = require('../data/recalculate-workload-points')
const logger = require('../log')

module.exports.execute = async function (task) {
  const reportId = task.workloadReportId
  return recalculateWorkloadPoints(reportId)
    .catch(function (error) {
      logger.error('RECALCULATE-WORKLOAD-POINTS - An error occurred recalculating workload points')
      logger.error(error)
      throw (error)
    })
}
