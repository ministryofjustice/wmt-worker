const logger = require('../log')
const getNewWorkloadOwnerIds = require('../data/get-new-workload-owner-ids')
const getOldWorkloadOwnerIds = require('../data/get-old-workload-owner-ids')
const disableIndexing = require('../data/disable-indexing')
const getMostRecentlyUsedWorkloadOwnerId = require('../data/get-most-recently-used-workload-owner-id')

const updateWorkloadWorkloadOwnerId = require('../data/update-workload-workload-owner-id')
const duplicateWorkloads = []
const oldAndNewCombined = []
const recalculateWorkloadPoints = require('../data/recalculate-workload-points')

module.exports.execute = function (task) {
  const regionIds = task.additionalData.regionIds
  const maximumWorkloadReportId = task.additionalData.maximumWorkloadReportId
  const reportId = task.workloadReportId
  return getNewWorkloadOwnerIds(regionIds)
    .then(function (newWorkloadOwners) {
      return Promise.all(newWorkloadOwners.map(function (workloadOwner) {
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
      }))
    })
    .then(function () {
      return Promise.all(duplicateWorkloads.map(function (duplicateWorkload) {
        return getMostRecentlyUsedWorkloadOwnerId(duplicateWorkload.old)
          .then(function (w) {
            if (w) {
              oldAndNewCombined.push({ old: w.workloadOwnerId, new: duplicateWorkload.new })
            }
          })
      }))
    })
    .then(function () {
      return disableIndexing()
    })
    .then(function () {
      logger.info('Indexing disabled')
      return Promise.all(oldAndNewCombined.map(function (onc) {
        return updateWorkloadWorkloadOwnerId(onc.old, onc.new, maximumWorkloadReportId)
      }))
    })
    .then(function () {
      return recalculateWorkloadPoints(reportId)
    })
    // .then(function () {
    //   return enableIndexing()
    // })
    .then(function () {
      logger.info('Indexing enabled')
    })
    .catch(function (error) {
      logger.error('MIGRATE-WORKLOADS - An error occurred migrating old workloads')
      logger.error(error)
      throw (error)
    })
}
