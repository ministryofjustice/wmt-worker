const logger = require('../log')
const checkForDuplicates = require('../data/check-for-duplicates')
const getDuplicateWorkloadPointsCalculationsId = require('../data/get-duplicate-workload-points-calculations-id')
// const deleteTiersForWorkloadIds = require('../data/delete-tiers-for-workload-ids')
// const deleteCaseDetailsForWorkloadIds = require('../data/delete-case-details-for-workload-ids')
const deleteWorkloadPointsCalculationsForWorkloadIds = require('../data/delete-workload-points-calculations-for-workload-ids')
// const deleteWorkloadsForIds = require('../data/delete-workloads-for-ids')

module.exports.execute = function (task) {
  return checkForDuplicates()
    .then(function (results) {
      if (results) {
        results.forEach(function (result) {
          return getDuplicateWorkloadPointsCalculationsId(result.link_id)
          .then(function (workloadIds) {
            var workloadIdsToRemove = []
            if (workloadIds.length > 1) {
              workloadIds.forEach(function (workloadId) {
                workloadIdsToRemove.push(workloadId.wpc_id)
              })
              workloadIdsToRemove = workloadIdsToRemove.sort()
              workloadIdsToRemove = workloadIdsToRemove.slice(1)
              // return deleteTiersForWorkloadIds(workloadIdsToRemove).then(function () {
                // return deleteCaseDetailsForWorkloadIds(workloadIdsToRemove).then(function () {
              return deleteWorkloadPointsCalculationsForWorkloadIds(workloadIdsToRemove).then(function () {
                // return deleteWorkloadsForIds(workloadIdsToRemove).then(function () {
                logger.info('REMOVE-DUPLICATES - Duplicates Removed')
              })
                  // })
                // })
              // })
            }
          })
        })
      }
    }).catch(function (error) {
      logger.error('REMOVE-DUPLICATES - An error occurred removing duplicates')
      logger.error(error)
      throw (error)
    })
}
