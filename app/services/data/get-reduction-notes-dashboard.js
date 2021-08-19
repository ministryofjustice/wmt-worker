const knex = require('../../../knex').appSchema
const dateFormatter = require('../../services/date-formatter')
const transformOrganisationName = require('./helpers/transform-organisation-name')

module.exports = function (duplicatePDUsAndTeams) {
  const table = 'reductions_notes_dashboard'
  const reductionsAsArray = []

  const selectColumns = [
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'region_code AS regionCode',
    'ldu_code AS lduCode',
    'team_code AS teamCode',
    'name AS offenderManager',
    'grade_code AS gradeCode',
    'contracted_hours AS contractedHours',
    'reduction_reason AS reason',
    'amount AS hours',
    'start_date AS startDate',
    'end_date AS endDate',
    'reduction_status AS status'
  ]

  return knex(table)
    .withSchema('app')
    .columns(selectColumns)
    .where('reduction_status', 'ACTIVE')
    .then(function (results) {
      results.forEach(function (record) {
        record.startDate = dateFormatter.formatDate(record.startDate, 'DD MM YYYY, HH:mm')
        record.endDate = dateFormatter.formatDate(record.endDate, 'DD MM YYYY, HH:mm')
        record.lduName = transformOrganisationName(duplicatePDUsAndTeams.duplicatePDUs, record.lduName, record.regionCode)
        record.teamName = transformOrganisationName(duplicatePDUsAndTeams.duplicateTeams, record.teamName, record.regionCode)
        reductionsAsArray.push([
          record.regionName,
          record.lduName,
          record.teamName,
          record.offenderManager,
          record.gradeCode,
          record.contractedHours,
          record.reason,
          record.hours,
          record.startDate,
          record.endDate,
          record.status
        ])
      })
      return reductionsAsArray
    })
}
