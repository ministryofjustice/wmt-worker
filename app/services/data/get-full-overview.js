const knex = require('../../../knex').appSchema

module.exports = function () {
  var table = 'individual_case_overview'
  var orderBy = 'lduCluster, teamName'

  var selectColumns = [
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
