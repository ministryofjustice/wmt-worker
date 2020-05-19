const logger = require('../log')
const getNewWorkloadOwnerIds = require('../data/get-new-workload-owner-ids')
const getOldWorkloadOwnerIds = require('../data/get-old-workload-owner-ids')
const disableIndexing = require('../data/disable-indexing')
const getMostRecentlyUsedWorkloadOwnerId = require('../data/get-most-recently-used-workload-owner-id')
const enableIndexing = require('../data/enable-indexing')

const updateWorkloadWorkloadOwnerId = require('../data/update-workload-workload-owner-id')
const Promise = require('bluebird').Promise
var duplicateWorkloads = []
var oldAndNewCombined = []

module.exports.execute = function (task) {
  var teamIds = task.additionalData.teamIds
  return getNewWorkloadOwnerIds(teamIds)
    .then(function (newWorkloadOwners) {
      return Promise.each(newWorkloadOwners, function (workloadOwner) {
        return getOldWorkloadOwnerIds(workloadOwner.teamId, workloadOwner.forename, workloadOwner.surname, workloadOwner.teamName)
        .then(function (oldWorkload) {
          if (oldWorkload.length > 1) {
            duplicateWorkloads.push({old: [oldWorkload[0].woId, oldWorkload[1].woId], new: workloadOwner.woId})
          } else {
            oldAndNewCombined.push({old: oldWorkload[0].woId, new: workloadOwner.woId})
          }
          var omIds = []
          omIds.push(oldWorkload[0].omId)
          if (oldWorkload.length > 1) {
            omIds.push(oldWorkload[1].omId)
          }
        })
      })
    })
    .then(function () {
      return Promise.each(duplicateWorkloads, function (duplicateWorkload) {
        return getMostRecentlyUsedWorkloadOwnerId(duplicateWorkload.old)
          .then(function (w) {
            oldAndNewCombined.push({old: w.workload_owner_id, new: duplicateWorkload.new})
          })
      })
    })
    .then(function () {
      return disableIndexing()
    })
    .then (function () {
      logger.info('Indexing disabled')
      return Promise.each(oldAndNewCombined, function (onc) {
        return updateWorkloadWorkloadOwnerId(onc.old, onc.new)
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
