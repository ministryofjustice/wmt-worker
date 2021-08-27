const getWorkloadOwnerForTeamAndOm = require('../data/get-workload-owner-for-team-and-om')
const insertGenericReduction = require('../data/insert-generic-reduction')
const updateContractedHours = require('../data/update-contracted-hours')
const recalculateWorkloadPoints = require('../data/recalculate-workload-points')
const deleteAllReductions = require('../data/delete-all-reductions')
const Promise = require('bluebird')
const glob = require('glob')
const config = require('../../../config')
const fs = require('fs')

module.exports.execute = function (task) {
  if (config.WMT_ENVIRONMENT === 'production') {
    throw new Error('IMPORT-REDUCTIONS-AND-CONTRACTED-HOURS: This task can only be used in a non-production environment')
  }

  if (!task.workloadReportId) {
    throw new Error('IMPORT-REDUCTIONS-AND-CONTRACTED-HOURS: The workloadReportId must be included in the task')
  }

  const reductionsAndContractedHoursFilePath = glob.sync(config.WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH + '*.json', {})

  if (reductionsAndContractedHoursFilePath.length < 1) {
    throw new Error('IMPORT-REDUCTIONS-AND-CONTRACTED-HOURS: The expected JSON file is not present at ' + config.WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH)
  } else if (reductionsAndContractedHoursFilePath.length > 1) {
    throw new Error('IMPORT-REDUCTIONS-AND-CONTRACTED-HOURS: More than ONE JSON file is present at ' + config.WMT_REDUCTIONS_AND_CONTRACTED_HOURS_PATH)
  }

  const reductionsAndContractedHours = require(reductionsAndContractedHoursFilePath[0])

  return deleteAllReductions()
    .then(function () {
      return Promise.each(reductionsAndContractedHours, function (result) {
        return getWorkloadOwnerForTeamAndOm(result.omKey, result.teamCode)
          .then(function (workloadOwner) {
            if (workloadOwner) {
              return insertGenericReduction(workloadOwner.woId, result.reductions)
                .then(function () {
                  return updateContractedHours(workloadOwner.woId, result.contractedHours)
                })
            } else {
              return Promise.resolve()
            }
          })
      })
        .then(function () {
          fs.unlinkSync(reductionsAndContractedHoursFilePath[0])
          return recalculateWorkloadPoints(task.workloadReportId)
        })
    })
}
