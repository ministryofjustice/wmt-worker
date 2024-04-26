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
    'd3_s as d3s',
    'd2_s as d2s',
    'd1_s as d1s',
    'd0_s as d0s',
    'c3_s as c3s',
    'c2_s as c2s',
    'c1_s as c1s',
    'c0_s as c0s',
    'b3_s as b3s',
    'b2_s as b2s',
    'b1_s as b1s',
    'b0_s as b0s',
    'a3_s as a3s',
    'a2_s as a2s',
    'a1_s as a1s',
    'a0_s as a0s'
  ]

  return knex('region_caseload_view').withSchema('app').select(selectList)
}
