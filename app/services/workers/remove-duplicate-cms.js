const logger = require('../log')
const checkForDuplicateCMS = require('../data/check-for-duplicate-cms')
const deleteDuplicateCMS = require('../data/delete-duplicate-cms')
const Promise = require('bluebird').Promise
const recalculateWorkloadPoints = require('../data/recalculate-workload-points')

module.exports.execute = function (task) {
  const reportId = task.workloadReportId
  return checkForDuplicateCMS()
    .then(function (duplicateCMSRecords) {
      return Promise.each(duplicateCMSRecords, function (duplicateCMS) {
        return deleteDuplicateCMS(duplicateCMS.contactId)
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
