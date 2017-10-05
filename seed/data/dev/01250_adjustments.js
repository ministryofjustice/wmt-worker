const adjustmentStatus = require('../../../app/constants/adjustment-status')
const adjustmentCategory = require('../../../app/constants/adjustment-category')

var tableName = 'adjustments'
var workloadOwnerId
var cmsAdjustmentReasons
var gsAdjustmentReasons

exports.seed = function (knex, Promise) {
  return knex(tableName).del()
  .then(function () {
    return knex('workload_owner').select('id').first()
  })
  .then(function (firstWorkloadOwnerId) {
    workloadOwnerId = firstWorkloadOwnerId.id
    return knex('adjustment_reason').select('id').where('category_id', adjustmentCategory.CMS)
  })
  .then(function (cmsAdjustmentReasonIds) {
    cmsAdjustmentReasons = cmsAdjustmentReasonIds
    return knex('adjustment_reason').select('id').where('category_id', adjustmentCategory.GS)
  })
  .then(function (gsAdjustmentReasonIds) {
    gsAdjustmentReasons = gsAdjustmentReasonIds
    var effectiveFromDate = (new Date()).getDate()
    var effectiveToDate = (new Date()).getDate()

    // Create dates for active adjustment record
    var activeFromDate = new Date()
    var activeToDate = new Date()
    activeFromDate.setDate(effectiveFromDate - 365)
    activeToDate.setDate(effectiveToDate + 365 * 10)

    // Create dates for scheduled adjustment record
    var scheduledFromDate = new Date()
    var scheduleToDate = new Date()
    scheduledFromDate.setDate(effectiveFromDate + 90)
    scheduleToDate.setDate(effectiveToDate + 365 * 10)

    // Create dates for archived adjustment record
    var archivedFromDate = new Date()
    var archivedToDate = new Date()
    archivedFromDate.setDate(effectiveFromDate - 360)
    archivedToDate.setDate(effectiveToDate - 365)

    return knex(tableName).insert([
      { workload_owner_id: workloadOwnerId,
        adjustment_reason_id: cmsAdjustmentReasons[0].id,
        effective_from: activeFromDate,
        effective_to: activeToDate,
        contact_id: 123,
        points: Math.floor(Math.random() * 6) + 1,
        status: adjustmentStatus.ACTIVE
      },
      { workload_owner_id: workloadOwnerId,
        adjustment_reason_id: gsAdjustmentReasons[0].id,
        effective_from: activeFromDate,
        effective_to: activeToDate,
        contact_id: 456,
        points: Math.floor(Math.random() * -6) + 1,
        status: adjustmentStatus.ACTIVE
      },
      { workload_owner_id: workloadOwnerId,
        adjustment_reason_id: cmsAdjustmentReasons[1].id,
        effective_from: scheduledFromDate,
        effective_to: scheduleToDate,
        contact_id: 789,
        points: Math.floor(Math.random() * -6) + 1,
        status: adjustmentStatus.SCHEDULED
      },
      { workload_owner_id: workloadOwnerId,
        adjustment_reason_id: cmsAdjustmentReasons[2].id,
        effective_from: archivedFromDate,
        effective_to: archivedToDate,
        contact_id: 321,
        points: Math.floor(Math.random() * 6) + 1,
        status: adjustmentStatus.ARCHIVED
      }
    ])
  })
}
