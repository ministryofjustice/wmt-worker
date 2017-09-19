var tableName = 'reductions'
var workloadOwnerId

exports.seed = function (knex, Promise) {
  return knex(tableName).del()
    .then(function () {
      return knex('workload_owner').select('id').first()
    })
    .then(function (firstWorkloadOwnerId) {
      workloadOwnerId = firstWorkloadOwnerId.id
      return knex('reduction_reason').select('id').where('is_cms', false)
    })
    .then(function (reductionReasonId) {
      return knex('reduction_reason').select('id').where('is_cms', true)
      .then(function (cmsReductionReasonId) {
        var effectiveFromDate = (new Date()).getDate()
        var effectiveToDate = (new Date()).getDate()

        // Create active reduction record
        var activeFromDate = new Date()
        var activeToDate = new Date()
        var activeStatus = 'ACTIVE'
        activeFromDate.setDate(effectiveFromDate - 365)
        activeToDate.setDate(effectiveToDate + 365 * 10)

        // Create scheduled reduction record
        var scheduledFromDate = new Date()
        var scheduleToDate = new Date()
        var scheduledStatus = 'SCHEDULED'
        scheduledFromDate.setDate(effectiveFromDate + 90)
        scheduleToDate.setDate(effectiveToDate + 365 * 10)

        // Create archived reduction record
        var archivedFromDate = new Date()
        var archivedToDate = new Date()
        var archivedStatus = 'ARCHIVED'
        archivedFromDate.setDate(effectiveFromDate - 360)
        archivedToDate.setDate(effectiveToDate - 365)

        // Create deleted reduction record
        var deletedFromDate = new Date()
        var deletedToDate = new Date()
        var deletedStatus = 'DELETED'
        deletedFromDate.setDate(effectiveFromDate - 365)
        deletedToDate.setDate(effectiveToDate + 365 * 10)

      // Create cms reduction record
        var cmsFromDate = new Date()
        var cmsToDate = new Date()
        var cmsStatus = 'ACTIVE'
        cmsFromDate.setDate(effectiveFromDate - 365)
        cmsToDate.setDate(effectiveToDate + 365 * 10)

      // Insert all records into the reduction table
        return knex(tableName).insert([
          { workload_owner_id: workloadOwnerId,
            reduction_reason_id: reductionReasonId[0].id,
            effective_from: activeFromDate,
            effective_to: activeToDate,
            hours: Math.floor(Math.random() * 6) + 1,
            status: activeStatus
          },
          { workload_owner_id: workloadOwnerId,
            reduction_reason_id: reductionReasonId[1].id,
            effective_from: scheduledFromDate,
            effective_to: scheduleToDate,
            hours: Math.floor(Math.random() * 6) + 1,
            status: scheduledStatus
          },
          { workload_owner_id: workloadOwnerId,
            reduction_reason_id: reductionReasonId[2].id,
            effective_from: archivedFromDate,
            effective_to: archivedToDate,
            hours: Math.floor(Math.random() * 6) + 1,
            status: archivedStatus
          },
          { workload_owner_id: workloadOwnerId,
            reduction_reason_id: reductionReasonId[2].id,
            effective_from: deletedFromDate,
            effective_to: deletedToDate,
            hours: Math.floor(Math.random() * 6) + 1,
            status: deletedStatus
          },
          { workload_owner_id: workloadOwnerId,
            reduction_reason_id: cmsReductionReasonId[0].id,
            effective_from: cmsFromDate,
            effective_to: cmsToDate,
            hours: Math.floor(Math.random() * 6) + 1,
            status: cmsStatus,
            contact_id: 123456
          }
        ])
      })
    })
}
