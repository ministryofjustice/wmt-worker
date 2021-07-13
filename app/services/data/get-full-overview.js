const knex = require('../../../knex').appSchema
const transformOrganisationName = require('./helpers/transform-organisation-name')

module.exports = function (duplicatePDUsAndTeams) {
  const table = 'individual_case_overview'
  let orderBy = 'lduName, teamName'

  const selectColumns = [
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'region_code AS regionCode',
    'ldu_code AS lduCode',
    'team_code AS teamCode',
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
      results.forEach(function (record) {
        record.lduName = transformOrganisationName(duplicatePDUsAndTeams.duplicatePDUs, record.lduName, record.regionCode)
        record.teamName = transformOrganisationName(duplicatePDUsAndTeams.duplicateTeams, record.teamName, record.regionCode)
      })
      return results
    })
}
