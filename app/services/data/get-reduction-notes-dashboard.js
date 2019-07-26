const knex = require('../../../knex').appSchema
const dateFormatter = require('../../services/date-formatter')

module.exports = function () {
  var table = 'reductions_notes_dashboard'
  var reductionsAsArray = []

  var selectColumns = [
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
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
    .columns(selectColumns)
    .where('reduction_status', 'ACTIVE')
    .then(function (results) {
      results.forEach(function (record) {
        record.startDate = dateFormatter.formatDate(record.startDate, 'DD MM YYYY, HH:mm')
        record.endDate = dateFormatter.formatDate(record.endDate, 'DD MM YYYY, HH:mm')
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
