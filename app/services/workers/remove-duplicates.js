const logger = require('../log')
const checkForDuplicates = require('../data/check-for-duplicates')
// const getDuplicateWorkloadPointsCalculationsId = require('../data/get-duplicate-workload-points-calculations-id')
const getDuplicateWorkloadIds = require('../data/get-duplicate-workload-ids')
const deleteTiersForWorkloadIds = require('../data/delete-tiers-for-workload-ids')
const deleteCaseDetailsForWorkloadIds = require('../data/delete-case-details-for-workload-ids')
const deleteWorkloadPointsCalculationsForWorkloadIds = require('../data/delete-workload-points-calculations-for-workload-ids')
const deleteWorkloadsForIds = require('../data/delete-workloads-for-ids')
const enableIndexing = require('../data/enable-indexing')
const Promise = require('bluebird').Promise

module.exports.execute = function (task) {
  return checkForDuplicates()
    .then(function (results) {
      return Promise.each(results, function (result) {
        return getDuplicateWorkloadIds(result.link_id)
        .then(function (workloadIds) {
          var workloadIdsToRemove = []
          if (workloadIds.length > 1) {
            workloadIds.forEach(function (workloadId) {
              workloadIdsToRemove.push(workloadId.workload_id)
            })
            workloadIdsToRemove = workloadIdsToRemove.sort()
            workloadIdsToRemove = workloadIdsToRemove.slice(1)
            return deleteTiersForWorkloadIds(workloadIdsToRemove).then(function () {
              return deleteCaseDetailsForWorkloadIds(workloadIdsToRemove).then(function () {
                return deleteWorkloadPointsCalculationsForWorkloadIds(workloadIdsToRemove).then(function () {
                  return deleteWorkloadsForIds(workloadIdsToRemove).then(function () {
                    logger.info('REMOVE-DUPLICATES - Duplicates Removed')
                  })
                })
              })
            })
          }
        })
      })
    })
    .then(function () {
      logger.info('REMOVE-DUPLICATES - Enabling Indexing')
      return enableIndexing()
    })
    .then(function () {
      logger.info('REMOVE-DUPLICATES - Indexing Enabled')
    })
    .catch(function (error) {
      logger.error('REMOVE-DUPLICATES - An error occurred removing duplicates')
      logger.error(error)
      throw (error)
    })
}
