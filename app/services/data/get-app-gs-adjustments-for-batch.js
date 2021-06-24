const knex = require('../../../knex').appSchema
const adjustmentCategory = require('../../constants/adjustment-category')

const adjustmentStatus = require('../../constants/adjustment-status')

module.exports = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return knex('adjustments')
    .withSchema('app')
    .join('adjustment_reason', 'adjustment_reason.id', 'adjustments.adjustment_reason_id')
    .join('workload', 'workload.workload_owner_id', 'adjustments.workload_owner_id')
    .andWhere('status', adjustmentStatus.ACTIVE)
    .andWhere('adjustment_reason.category_id', adjustmentCategory.GS)
    .andWhereBetween('workload.staging_id', [workloadStagingIdStart, workloadStagingIdEnd])
    .andWhere('workload.workload_report_id', workloadReportId)
    .select('adjustments.id AS id',
      'adjustments.workload_owner_id AS workloadOwnerId',
      'adjustments.contact_id AS contactId',
      'adjustments.points AS points',
      'adjustments.adjustment_reason_id AS adjustmentReasonId',
      'adjustments.effective_from AS effectiveFrom',
      'adjustments.effective_to AS effectiveTo',
      'adjustments.status AS status',
      'adjustments.case_ref_no AS case_ref_no')
}
