const knex = require('../../../knex').appSchema

module.exports = function () {
  const table = 'region_caseload_view'

  const selectList = [
    'name',
    'link_id AS linkId',
    'grade_code AS grade',
    'region_name AS regionName',
    'region_code AS regionCode',
    'ldu_code AS lduCode',
    'total_cases AS totalCases',
    'location AS caseType',
    'untiered',
    'd3',
    'd2',
    'd1',
    'd0',
    'c3',
    'c2',
    'c1',
    'c0',
    'b3',
    'b2',
    'b1',
    'b0',
    'a3',
    'a2',
    'a1',
    'a0'
  ]

  const noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint)
}
