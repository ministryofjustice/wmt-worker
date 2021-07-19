const knex = require('../../../knex').appSchema

module.exports = function () {
  const table = 'app.individual_case_overview'

  const selectColumns = [
    'region_name AS regionName',
    'ldu_name AS lduCluster',
    'team_name AS teamName',
    'of_name AS offenderManager',
    'total_cases AS totalCases',
    'available_points AS availablePoints',
    'total_points AS totalPoints',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reductionHours',
    'cms_adjustment_points as cmsAdjustmentPoints',
    'grade_code AS gradeCode'
  ]

  return knex('individual_case_overview')
    .withSchema('app')
    .select(selectColumns)
    .orderBy('region_name')
    .orderBy('ldu_name')
    .orderBy('team_name')
    .then(function (results) {
      return results
    })
}
