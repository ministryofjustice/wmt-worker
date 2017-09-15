const getStagingCmsReductions = require('./data/get-staging-cms-reductions')
const getWorkloadOwnerId = require('./data/get-app-workload-owner-id')
const getReductionReasonFromCode = require('./data/get-reduction-reason-from-code')
const reductionStatus = require('../constants/reduction-status')

module.exports = function () {
  return getStagingCmsReductions()
  .then(function (cmsReductions) {
    var stgReductions = []
    var promises = []

    if (cmsReductions) {
      cmsReductions.forEach(function (cmsReduction) {
        promises.push(
          getReductionReasonFromCode(cmsReduction.contactCode)
          .then(function (reductionReason) {
            return getWorkloadOwnerId(cmsReduction.contactStaffKey, cmsReduction.contactTeamKey)
            .then(function (contactWorkloadOwnerId) {
              return getWorkloadOwnerId(cmsReduction.omKey, cmsReduction.omTeamKey)
              .then(function (omWorkloadOwnerId) {
                var startDate = new Date(cmsReduction.contactDate)
                var endDate = new Date(startDate)
                endDate.setDate(endDate.getDate() + 30)

                var contactReduction = {
                  contactId: cmsReduction.contactId,
                  workloadOwnerId: contactWorkloadOwnerId,
                  hours: reductionReason.fixedAllowanceHours,
                  reductionReasonId: reductionReason.id,
                  effectiveFrom: startDate,
                  effetiveTo: endDate,
                  status: reductionStatus.ACTIVE,
                  note: null
                }

                var omReduction = {
                  contactId: cmsReduction.contactId,
                  workloadOwnerId: omWorkloadOwnerId,
                  hours: reductionReason.fixedAllowanceHours * -1,
                  reductionReasonId: reductionReason.id,
                  effectiveFrom: startDate,
                  effetiveTo: endDate,
                  status: reductionStatus.ACTIVE,
                  note: null
                }

                stgReductions.push(contactReduction)
                stgReductions.push(omReduction)
              })
            })
          })
        )
      })
    }

    return Promise.all(promises)
    .then(function () {
      return stgReductions
    })
  })
}
