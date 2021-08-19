const logger = require('../log')
const getNewWorkloadOwnerIds = require('../data/get-new-workload-owner-ids')
const getOldWorkloadOwnerIds = require('../data/get-old-workload-owner-ids')
const getMostRecentlyUsedWorkloadOwnerId = require('../data/get-most-recently-used-workload-owner-id')

const updateContractedHours = require('../data/update-contracted-hours')
const duplicateWorkloads = []
const oldAndNewCombined = []
const recalculateWorkloadPoints = require('../data/recalculate-workload-points')
const { arrayToPromise } = require('../helpers/promise-helper')

module.exports.execute = function (task) {
  const regionIds = task.additionalData.regionIds
  const reportId = task.workloadReportId
  return getNewWorkloadOwnerIds(regionIds)
    .then(function (newWorkloadOwners) {
      return arrayToPromise(newWorkloadOwners, function (workloadOwner) {
        return getOldWorkloadOwnerIds(workloadOwner.teamId, workloadOwner.forename, workloadOwner.surname, workloadOwner.teamName)
          .then(function (oldWorkload) {
            if (oldWorkload) {
              if (oldWorkload.length > 1) {
                duplicateWorkloads.push({ old: [oldWorkload[0].woId, oldWorkload[1].woId], new: workloadOwner.woId })
              } else if (oldWorkload.length === 1) {
                oldAndNewCombined.push({ old: oldWorkload[0].woId, new: workloadOwner.woId, contractedHours: oldWorkload[0].contractedHours, cameFromDuplicate: false })
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
              oldAndNewCombined.push({ old: w.workloadOwnerId, new: duplicateWorkload.new, contractedHours: w.contractedHours, cameFromDuplicate: true })
            }
          })
      })
    })
    .then(function () {
      return arrayToPromise(oldAndNewCombined, function (onc) {
        logger.info(onc.new, onc.old, onc.contractedHours, onc.cameFromDuplicate)
        return updateContractedHours(onc.new, onc.contractedHours)
      })
    })
    .then(function () {
      return recalculateWorkloadPoints(reportId)
    })
    .catch(function (error) {
      logger.error('MIGRATE-CONTRACTED-HOURS - An error occurred migrating contracted hours')
      logger.error(error)
      throw (error)
    })
}
