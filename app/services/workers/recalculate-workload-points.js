const recalculateWorkloadPoints = require('../data/recalculate-workload-points')

module.exports.execute = function (task) {
  const reportId = task.workloadReportId
  return recalculateWorkloadPoints(reportId)
    .catch(function (error) {
      logger.error('RECALCULATE-WORKLOAD-POINTS - An error occurred recalculating workload points')
      logger.error(error)
      throw (error)
    })
}
