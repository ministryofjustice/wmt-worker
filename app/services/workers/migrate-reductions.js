const logger = require('../log')
const getNewWorkloadOwnerIds = require('../data/get-new-workload-owner-ids')
const getOldWorkloadOwnerIds = require('../data/get-old-workload-owner-ids')
const getMostRecentlyUsedWorkloadOwnerId = require('../data/get-most-recently-used-workload-owner-id')
const { arrayToPromise } = require('../helpers/promise-helper')
const updateReductionsWorkloadOwnerId = require('../data/update-reductions-workload-owner-id')
const duplicateWorkloads = []
const oldAndNewCombined = []

module.exports.execute = async function (task) {
  const teamIds = task.additionalData.teamIds
  return getNewWorkloadOwnerIds(teamIds)
    .then(function (newWorkloadOwners) {
      return arrayToPromise(newWorkloadOwners, function (workloadOwner) {
        return getOldWorkloadOwnerIds(workloadOwner.teamId, workloadOwner.forename, workloadOwner.surname, workloadOwner.teamName)
          .then(function (oldWorkload) {
            if (oldWorkload) {
              if (oldWorkload.length > 1) {
                duplicateWorkloads.push({ old: [oldWorkload[0].woId, oldWorkload[1].woId], new: workloadOwner.woId })
              } else if (oldWorkload.length === 1) {
                oldAndNewCombined.push({ old: oldWorkload[0].woId, new: workloadOwner.woId })
              }
            }
          })
      })
    })
    .then(function () {
      return arrayToPromise(duplicateWorkloads, function (duplicateWorkload) {
        return getMostRecentlyUsedWorkloadOwnerId(duplicateWorkload.old)
          .then(function (w) {
            if (w) {
              oldAndNewCombined.push({ old: w.workloadOwnerId, new: duplicateWorkload.new })
            }
          })
      })
    })
    .then(function () {
      return arrayToPromise(oldAndNewCombined, function (onc) {
        return updateReductionsWorkloadOwnerId(onc.old, onc.new)
      })
    })
    .catch(function (error) {
      logger.error('MIGRATE-REDUCTIONS - An error occurred migrating Reductions')
      logger.error(error)
      throw (error)
    })
}
