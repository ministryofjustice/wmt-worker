const getStagingCms = require('./data/get-staging-cms')
const getWorkloadOwnerId = require('./data/get-app-workload-owner-id')
const getAdjustmentReasonFromCode = require('./data/get-adjustment-reason-from-code')
const getWorkloadOwnersInWorkloadRange = require('./data/get-workload-owners-in-workload-range')
const adjustmentStatus = require('../constants/adjustment-status')
const moment = require('moment')
const { arrayToPromise } = require('./helpers/promise-helper')

module.exports.mapCmsAdjustments = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getWorkloadOwnersInWorkloadRange(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (workloadOwnerIds) {
      return getStagingCms(workloadStagingIdStart, workloadStagingIdEnd)
        .then(function (cmsRecords) {
          return arrayToPromise(cmsRecords, function (cmsRecord) {
            return getAdjustmentReasonFromCode(cmsRecord.contactCode)
              .then(function (adjustmentReason) {
                return getWorkloadOwnerId(cmsRecord.contactStaffKey, cmsRecord.contactTeamKey)
                  .then(function (contactWorkloadOwnerId) {
                    return getWorkloadOwnerId(cmsRecord.omKey, cmsRecord.omTeamKey)
                      .then(function (omWorkloadOwnerId) {
                        const startDate = moment(cmsRecord.contactDate).format('YYYY-MM-DD')
                        const endDate = moment(startDate).add(7, 'days')
                        const result = []
                        if (adjustmentReason && endDate.isAfter(moment(), 'day')) {
                          const contactAdjustment = {
                            contactId: cmsRecord.contactId,
                            workloadOwnerId: contactWorkloadOwnerId,
                            points: adjustmentReason.points,
                            adjustmentReasonId: adjustmentReason.id,
                            effectiveFrom: startDate,
                            effectiveTo: endDate.format('YYYY-MM-DD'),
                            status: adjustmentStatus.ACTIVE,
                            crn: cmsRecord.crn
                          }

                          const omAdjustment = {
                            contactId: cmsRecord.contactId,
                            workloadOwnerId: omWorkloadOwnerId,
                            points: adjustmentReason.points * -1,
                            adjustmentReasonId: adjustmentReason.id,
                            effectiveFrom: startDate,
                            effectiveTo: endDate.format('YYYY-MM-DD'),
                            status: adjustmentStatus.ACTIVE,
                            crn: cmsRecord.crn
                          }

                          if (workloadOwnerIds.includes(contactAdjustment.workloadOwnerId)) {
                            result.push(contactAdjustment)
                          }

                          if (workloadOwnerIds.includes(omAdjustment.workloadOwnerId)) {
                            result.push(omAdjustment)
                          }
                        }
                        return result
                      })
                  })
              })
          }).then(function (result) {
            return result.flat()
          })
        })
    })
}
