const getStagingCmsReductions = require('./data/get-staging-cms-reductions')
const getStagingGsReductions = require('./data/get-staging-gs-reductions')
const getWorkloadOwnerId = require('./data/get-app-workload-owner-id')
const getReductionReasonFromCode = require('./data/get-reduction-reason-from-code')
const reductionStatus = require('../constants/reduction-status')
const reductionContactType = require('../constants/reduction-contact-type')

module.exports.mapCmsReductions = function () {
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
                  effectiveTo: endDate,
                  status: reductionStatus.ACTIVE,
                  note: null,
                  contactType: reductionContactType.CMS
                }

                var omReduction = {
                  contactId: cmsReduction.contactId,
                  workloadOwnerId: omWorkloadOwnerId,
                  hours: reductionReason.fixedAllowanceHours * -1,
                  reductionReasonId: reductionReason.id,
                  effectiveFrom: startDate,
                  effectiveTo: endDate,
                  status: reductionStatus.ACTIVE,
                  note: null,
                  contactType: reductionContactType.CMS
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

module.exports.mapGsReductions = function () {
  return getStagingGsReductions()
  .then(function (stagingGsReductions) {
    var gsReductions = []
    var promises = []

    if (stagingGsReductions) {
      stagingGsReductions.forEach(function (gsReduction) {
        promises.push(
          getReductionReasonFromCode(gsReduction.contactCode)
          .then(function (reductionReason) {
            return getWorkloadOwnerId(gsReduction.omKey, gsReduction.omTeamKey)
            .then(function (workloadOwnerId) {
              // TODO: Work out what's happening with date times
              var startDate = new Date(gsReduction.contactDate)
              var endDate = new Date(startDate)
              endDate.setDate(endDate.getDate() + 30)

              var newGsReduction = {
                contactId: gsReduction.contactId,
                workloadOwnerId: workloadOwnerId,
                hours: reductionReason.fixedAllowanceHours * -1,
                reductionReasonId: reductionReason.id,
                effectiveFrom: startDate,
                effectiveTo: endDate,
                status: reductionStatus.ACTIVE,
                note: null,
                contactType: reductionContactType.GS
              }
              gsReductions.push(newGsReduction)
            })
          })
        )
      })
    }

    return Promise.all(promises)
    .then(function () {
      return gsReductions
    })
  })
}
