const knex = require('../../../knex').appSchema

module.exports = function () {
  const table = 'region_caseload_view'

  const selectList = [
    'name',
    'link_id AS linkId',
    'grade_code AS grade',
    'region_name AS regionName',
    'total_cases AS totalCases',
    'location AS caseType',
    'untiered',
    'd2',
    'd1',
    'c2',
    'c1',
    'b2',
    'b1',
    'a'
  ]

  const noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint)
}
