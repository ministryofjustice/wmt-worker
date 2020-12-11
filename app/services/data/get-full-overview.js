const knex = require('../../../knex').appSchema

module.exports = function () {
  const table = 'individual_case_overview'
  let orderBy = 'lduCluster, teamName'

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

  orderBy = 'regionName,' + orderBy

  return knex.raw(
    'SELECT ' + selectColumns.join(', ') +
        ' FROM ' + table + ' WITH (NOEXPAND)' +
        ' ORDER BY ' + orderBy)
    .then(function (results) {
      return results
    })
}
