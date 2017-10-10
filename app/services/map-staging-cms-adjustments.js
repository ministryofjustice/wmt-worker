const getStagingCms = require('./data/get-staging-cms')
const getWorkloadOwnerId = require('./data/get-app-workload-owner-id')
const getAdjustmentReasonFromCode = require('./data/get-adjustment-reason-from-code')
const getWorkloadOwnersInWorkloadRange = require('./data/get-workload-owners-in-workload-range')
const adjustmentStatus = require('../constants/adjustment-status')

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getWorkloadOwnersInWorkloadRange(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
  .then(function (workloadOwnerIds) {
    return getStagingCms()
    .then(function (cmsRecords) {
      var stgAdjustments = []
      var promises = []

      if (cmsRecords) {
        cmsRecords.forEach(function (cmsRecord) {
          promises.push(
            getAdjustmentReasonFromCode(cmsRecord.contactCode)
            .then(function (adjustmentReason) {
              return getWorkloadOwnerId(cmsRecord.contactStaffKey, cmsRecord.contactTeamKey)
              .then(function (contactWorkloadOwnerId) {
                return getWorkloadOwnerId(cmsRecord.omKey, cmsRecord.omTeamKey)
                .then(function (omWorkloadOwnerId) {
                  var startDate = new Date(cmsRecord.contactDate)
                  var endDate = new Date(startDate)
                  endDate.setDate(endDate.getDate() + 30)

                  var contactAdjustment = {
                    contactId: cmsRecord.contactId,
                    workloadOwnerId: contactWorkloadOwnerId,
                    points: adjustmentReason.points,
                    adjustmentReasonId: adjustmentReason.id,
                    effectiveFrom: startDate,
                    effectiveTo: endDate,
                    status: adjustmentStatus.ACTIVE
                  }

                  var omAdjustment = {
                    contactId: cmsRecord.contactId,
                    workloadOwnerId: omWorkloadOwnerId,
                    points: adjustmentReason.points * -1,
                    adjustmentReasonId: adjustmentReason.id,
                    effectiveFrom: startDate,
                    effectiveTo: endDate,
                    status: adjustmentStatus.ACTIVE
                  }

                  if (workloadOwnerIds.includes(contactAdjustment.workloadOwnerId)) {
                    stgAdjustments.push(contactAdjustment)
                  }

                  if (workloadOwnerIds.includes(omAdjustment.workloadOwnerId)) {
                    stgAdjustments.push(omAdjustment)
                  }
                })
              })
            })
          )
        })
      }

      return Promise.all(promises)
      .then(function () {
        return stgAdjustments
      })
    })
  })
}
