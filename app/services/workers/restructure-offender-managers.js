const getWorkloadOwnerForTeamAndOm = require('../data/get-workload-owner-for-team-and-om')
const { arrayToPromise } = require('../helpers/promise-helper')
const getReductionsByWorkloadOwnerId = require('../data/get-reductions-by-workload-owner-id')
const insertReduction = require('../data/insert-reduction')
const updateContractedHours = require('../data/update-contracted-hours')
const { auditReductionCopy, auditContractedHoursUpdated } = require('../audit-service')

module.exports.execute = async function (task) {
  return arrayToPromise(task.additionalData.restructureOffenderManagers, function (restructureOffenderManager) {
    return getWorkloadOwnerForTeamAndOm(restructureOffenderManager.offenderManagerKey, restructureOffenderManager.previousTeamCode)
      .then(function (previousWorkloadOwner) {
        return getWorkloadOwnerForTeamAndOm(restructureOffenderManager.offenderManagerKey, restructureOffenderManager.newTeamCode)
          .then(function (newWorkloadOwner) {
            return Promise.all([getReductionsByWorkloadOwnerId(previousWorkloadOwner.woId)
              .then(function (reductions) {
                return arrayToPromise(reductions, function (toCopyReduction) {
                  const toCreateReduction = {
                    ...toCopyReduction,
                    workload_owner_id: newWorkloadOwner.woId
                  }
                  return insertReduction(toCreateReduction)
                    .then(function () {
                      return auditReductionCopy(toCreateReduction, newWorkloadOwner)
                    })
                })
              }),
            updateContractedHours(newWorkloadOwner.woId, previousWorkloadOwner.contractedHours)
              .then(function () {
                return auditContractedHoursUpdated(newWorkloadOwner.contractedHours, previousWorkloadOwner.contractedHours, newWorkloadOwner)
              })
            ])
          })
      })
  })
}
