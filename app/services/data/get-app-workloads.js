const knex = require('../../../knex').appSchema

module.exports = function (initialId, maxId, workloadReportId) {
  return knex('workload').withSchema('app')
      .leftJoin('tiers', 'workload.id', 'workload_id')
      .leftJoin('workload_owner', 'workload.workload_owner_id', 'workload_owner.id')
      .leftJoin('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
      .whereBetween('workload.staging_id', [initialId, maxId])
      .andWhere('workload.workload_report_id', workloadReportId)
      .select('workload.id',
              'workload.staging_id',
              'workload.workload_owner_id',
              'workload.total_cases',
              'workload.total_filtered_cases',
              'workload.total_t2a_cases',
              'workload.total_custody_cases',
              'workload.total_community_cases',
              'workload.total_license_cases',
              'workload.total_filtered_custody_cases',
              'workload.total_filtered_community_cases',
              'workload.total_filtered_license_cases',
              'workload.total_t2a_custody_cases',
              'workload.total_t2a_community_cases',
              'workload.total_t2a_license_cases',
              'workload.monthly_sdrs',
              'workload.sdr_conversions_last_30_days',
              'workload.sdr_due_next_30_days',
              'workload.paroms_due_next_30_days',
              'workload.paroms_completed_last_30_days',
              'workload.license_last_16_weeks',
              'workload.arms_community_cases',
              'workload.arms_license_cases',
              'workload.community_last_16_weeks',
              'tiers.total_cases as tiers_total_cases',
              'tiers.total_filtered_cases as tiers_total_filtered_cases',
              'tiers.warrants_total',
              'tiers.unpaid_work_total',
              'tiers.overdue_terminations_total',
              'tiers.t2a_total_cases AS t2a_tiers_total_cases',
              'tiers.t2a_warrants_total',
              'tiers.t2a_unpaid_work_total',
              'tiers.t2a_overdue_terminations_total',
              'tiers.suspended_total',
              'tiers.suspended_lifer_total',
              'tiers.location',
              'tiers.tier_number'
              )
}
