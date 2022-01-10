const getDuplicateOffenderManagers = require('../data/get-duplicate-offender-managers')
const { arrayToPromise } = require('../helpers/promise-helper')
const updateWorkloadWorkloadOwnerId = require('../data/update-workload-workload-owner-id')
const updateOmicWorkloadWorkloadOwnerId = require('../data/update-omic-workload-workload-owner-id')
const updateReductionWorkloadOwnerId = require('../data/update-reduction-workload-owner-id')
const updateCourtReportsWorkloadOwnerId = require('../data/update-court-reports-workload-owner-id')
const updateAdjustmentsWorkloadOwnerId = require('../data/update-adjustments-workload-owner-id')

module.exports.execute = async function (task) {
  return getDuplicateOffenderManagers()
    .then(function (duplicateOffenderManagers) {
      return arrayToPromise(duplicateOffenderManagers, function (duplicateOffenderManager) {
        const toUpdateOffenderManagerIds = duplicateOffenderManager.duplicate_ids.split(',').map((id) => parseInt(id)).filter((id) => id !== duplicateOffenderManager.maximum_workload_owner_id)
        return updateWorkloadWorkloadOwnerId(duplicateOffenderManager.maximum_workload_owner_id, toUpdateOffenderManagerIds)
          .then(function () {
            return updateOmicWorkloadWorkloadOwnerId(duplicateOffenderManager.maximum_workload_owner_id, toUpdateOffenderManagerIds)
          })
          .then(function () {
            return updateReductionWorkloadOwnerId(duplicateOffenderManager.maximum_workload_owner_id, toUpdateOffenderManagerIds)
          })
          .then(function () {
            return updateCourtReportsWorkloadOwnerId(duplicateOffenderManager.maximum_workload_owner_id, toUpdateOffenderManagerIds)
          })
          .then(function () {
            return updateAdjustmentsWorkloadOwnerId(duplicateOffenderManager.maximum_workload_owner_id, toUpdateOffenderManagerIds)
          })
      })
    })
}
