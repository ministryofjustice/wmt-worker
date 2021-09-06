const logger = require('../log')
const checkForDuplicateCMS = require('../data/check-for-duplicate-cms')
const deleteDuplicateCMS = require('../data/delete-duplicate-cms')
const recalculateWorkloadPoints = require('../data/recalculate-workload-points')
const { arrayToPromise } = require('../helpers/promise-helper')

module.exports.execute = function (task) {
  const reportId = task.workloadReportId
  return checkForDuplicateCMS()
    .then(function (duplicateCMSRecords) {
      return arrayToPromise(duplicateCMSRecords, function (duplicateCMS) {
        return deleteDuplicateCMS(duplicateCMS.contactid)
      })
    })
    .then(function () {
      return recalculateWorkloadPoints(reportId)
    })
    .catch(function (error) {
      logger.error('REMOVE-DUPLICATE-CMS - An error occurred removing duplicates')
      logger.error(error)
      throw (error)
    })
}
