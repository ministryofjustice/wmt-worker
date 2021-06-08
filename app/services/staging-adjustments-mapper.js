const getStagingCms = require('./data/get-staging-cms')
const getStagingGs = require('./data/get-staging-gs')
const getWorkloadOwnerId = require('./data/get-app-workload-owner-id')
const getAdjustmentReasonFromCode = require('./data/get-adjustment-reason-from-code')
const getWorkloadOwnersInWorkloadRange = require('./data/get-workload-owners-in-workload-range')
const adjustmentStatus = require('../constants/adjustment-status')
const moment = require('moment')

module.exports.mapCmsAdjustments = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getWorkloadOwnersInWorkloadRange(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (workloadOwnerIds) {
      return getStagingCms(workloadStagingIdStart, workloadStagingIdEnd)
        .then(function (cmsRecords) {
          const stgAdjustments = []
          const promises = []

          if (cmsRecords) {
            cmsRecords.forEach(function (cmsRecord) {
              promises.push(
                getAdjustmentReasonFromCode(cmsRecord.contactCode)
                  .then(function (adjustmentReason) {
                    return getWorkloadOwnerId(cmsRecord.contactStaffKey, cmsRecord.contactTeamKey)
                      .then(function (contactWorkloadOwnerId) {
                        return getWorkloadOwnerId(cmsRecord.omKey, cmsRecord.omTeamKey)
                          .then(function (omWorkloadOwnerId) {
                            const startDate = moment(cmsRecord.contactDate).format('YYYY-MM-DD')
                            const endDate = moment(startDate).add(30, 'days').format('YYYY-MM-DD')

                            if (adjustmentReason) {
                              const contactAdjustment = {
                                contactId: cmsRecord.contactId,
                                workloadOwnerId: contactWorkloadOwnerId,
                                points: adjustmentReason.points,
                                adjustmentReasonId: adjustmentReason.id,
                                effectiveFrom: startDate,
                                effectiveTo: endDate,
                                status: adjustmentStatus.ACTIVE,
                                crn: cmsRecord.crn
                              }

                              const omAdjustment = {
                                contactId: cmsRecord.contactId,
                                workloadOwnerId: omWorkloadOwnerId,
                                points: adjustmentReason.points * -1,
                                adjustmentReasonId: adjustmentReason.id,
                                effectiveFrom: startDate,
                                effectiveTo: endDate,
                                status: adjustmentStatus.ACTIVE,
                                crn: cmsRecord.crn
                              }

                              if (workloadOwnerIds.includes(contactAdjustment.workloadOwnerId)) {
                                stgAdjustments.push(contactAdjustment)
                              }

                              if (workloadOwnerIds.includes(omAdjustment.workloadOwnerId)) {
                                stgAdjustments.push(omAdjustment)
                              }
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

module.exports.mapGsAdjustments = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getWorkloadOwnersInWorkloadRange(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (workloadOwnerIds) {
      return getStagingGs()
        .then(function (stagingGsAdjustments) {
          const gsAdjustments = []
          const promises = []

          if (stagingGsAdjustments) {
            stagingGsAdjustments.forEach(function (gsAdjustment) {
              promises.push(
                getAdjustmentReasonFromCode(gsAdjustment.contactCode)
                  .then(function (adjustmentReason) {
                    return getWorkloadOwnerId(gsAdjustment.omKey, gsAdjustment.omTeamKey)
                      .then(function (workloadOwnerId) {
                        const startDate = moment(gsAdjustment.contactDate).format('YYYY-MM-DD')
                        const endDate = moment(startDate).add(30, 'days').format('YYYY-MM-DD')

                        const newGsAdjustment = {
                          contactId: gsAdjustment.contactId,
                          workloadOwnerId: workloadOwnerId,
                          points: adjustmentReason.points * -1,
                          adjustmentReasonId: adjustmentReason.id,
                          effectiveFrom: startDate,
                          effectiveTo: endDate,
                          status: adjustmentStatus.ACTIVE,
                          crn: gsAdjustment.crn
                        }
                        if (workloadOwnerIds.includes(newGsAdjustment.workloadOwnerId)) {
                          gsAdjustments.push(newGsAdjustment)
                        }
                      })
                  })
              )
            })
          }

          return Promise.all(promises)
            .then(function () {
              return gsAdjustments
            })
        })
    })
}
