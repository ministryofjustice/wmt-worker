const knex = require('../../../knex').appSchema

module.exports = function () {
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
    'a0',
    'd3_s',
    'd2_s',
    'd1_s',
    'd0_s',
    'c3_s',
    'c2_s',
    'c1_s',
    'c0_s',
    'b3_s',
    'b2_s',
    'b1_s',
    'b0_s',
    'a3_s',
    'a2_s',
    'a1_s',
    'a0_s'
  ]

  return knex('region_caseload_view').withSchema('app').select(selectList)
}
