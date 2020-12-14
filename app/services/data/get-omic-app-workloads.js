const knex = require('../../../knex').appSchema

module.exports = function (initialId, maxId, workloadReportId) {
  return knex('omic_workload').withSchema('app')
    .leftJoin('omic_tiers', 'omic_workload.id', 'omic_workload_id')
    .leftJoin('workload_owner', 'omic_workload.workload_owner_id', 'workload_owner.id')
    .leftJoin('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
    .whereBetween('omic_workload.staging_id', [initialId, maxId])
    .andWhere('omic_workload.workload_report_id', workloadReportId)
    .select('omic_workload.id',
      'omic_workload.staging_id',
      'omic_workload.workload_owner_id',
      'omic_workload.total_cases',
      'omic_workload.total_filtered_cases',
      'omic_workload.total_t2a_cases',
      'omic_workload.total_custody_cases',
      'omic_workload.total_community_cases',
      'omic_workload.total_license_cases',
      'omic_workload.total_filtered_custody_cases',
      'omic_workload.total_filtered_community_cases',
      'omic_workload.total_filtered_license_cases',
      'omic_workload.total_t2a_custody_cases',
      'omic_workload.total_t2a_community_cases',
      'omic_workload.total_t2a_license_cases',
      'omic_workload.monthly_sdrs',
      'omic_workload.sdr_conversions_last_30_days',
      'omic_workload.sdr_due_next_30_days',
      'omic_workload.paroms_due_next_30_days',
      'omic_workload.paroms_completed_last_30_days',
      'omic_workload.license_last_16_weeks',
      'omic_workload.arms_community_cases',
      'omic_workload.arms_license_cases',
      'omic_workload.community_last_16_weeks',
      'omic_tiers.total_cases as tiers_total_cases',
      'omic_tiers.total_filtered_cases as tiers_total_filtered_cases',
      'omic_tiers.warrants_total',
      'omic_tiers.unpaid_work_total',
      'omic_tiers.overdue_terminations_total',
      'omic_tiers.t2a_total_cases AS t2a_tiers_total_cases',
      'omic_tiers.t2a_warrants_total',
      'omic_tiers.t2a_unpaid_work_total',
      'omic_tiers.t2a_overdue_terminations_total',
      'omic_tiers.suspended_total',
      'omic_tiers.suspended_lifer_total',
      'omic_tiers.location',
      'omic_tiers.tier_number'
    )
}
