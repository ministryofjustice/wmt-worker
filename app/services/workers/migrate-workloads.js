const logger = require('../log')
const getNewWorkloadOwnerIds = require('../data/get-new-workload-owner-ids')
const getOldWorkloadOwnerIds = require('../data/get-old-workload-owner-ids')
const disableIndexing = require('../data/disable-indexing')
const getMostRecentlyUsedWorkloadOwnerId = require('../data/get-most-recently-used-workload-owner-id')
const enableIndexing = require('../data/enable-indexing')

const updateReductionsWorkloadOwnerId = require('../data/update-reductions-workload-owner-id')
const Promise = require('bluebird').Promise
const duplicateWorkloads = []
const oldAndNewCombined = []

module.exports.execute = function (task) {
  const teamIds = task.additionalData.teamIds
  const maximumWorkloadReportId = task.additionalData.maximumWorkloadReportId
  return getNewWorkloadOwnerIds(teamIds)
    .then(function (newWorkloadOwners) {
      return Promise.each(newWorkloadOwners, function (workloadOwner) {
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
      return Promise.each(duplicateWorkloads, function (duplicateWorkload) {
        return getMostRecentlyUsedWorkloadOwnerId(duplicateWorkload.old)
          .then(function (w) {
            if (w) {
              oldAndNewCombined.push({ old: w.workloadOwnerId, new: duplicateWorkload.new })
            }
          })
      })
    })
    .then(function () {
      return disableIndexing()
    })
    .then(function () {
      logger.info('Indexing disabled')
      return Promise.each(oldAndNewCombined, function (onc) {
        return updateReductionsWorkloadOwnerId(onc.old, onc.new, maximumWorkloadReportId)
      })
    })
    .then(function () {
      return enableIndexing()
    })
    .then(function () {
      logger.info('Indexing enabled')
    })
    .catch(function (error) {
      logger.error('MIGRATE-WORKLOADS - An error occurred migrating old workloads')
      logger.error(error)
      throw (error)
    })
}
