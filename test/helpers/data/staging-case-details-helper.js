const config = require('../../../knexfile').development
const knex = require('knex')(config)
const stagingHelper = require('wmt-probation-rules').stagingTestHelper

const aliases = {
  caseRefNo: 'case_ref_no',
  location: 'location',
  omGradeCode: 'om_grade_code',
  omKey: 'om_key',
  rowType: 'row_type',
  teamCode: 'team_code',
  tierCode: 'tier_code'
}

// Create a test CaseDetails object, mapping properties to column names
const testCaseDetails = mapForInsert(getTestCaseDetails(getGeneratedCaseRefNo(), '12345', 'community'))

module.exports.insertWarrant = function () {
  return knex('stg_flag_warr_4_n')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertUnpaidWork = function () {
  return knex('stg_flag_upw')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertOverdueTermination = function () {
  return knex('stg_flag_o_due')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertPriority = function () {
  return knex('stg_flag_priority')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.deleteAll = function () {
  return knex('stg_flag_warr_4_n').del()
    .then(function () {
      return knex('stg_flag_upw').del()
    }).then(function () {
      return knex('stg_flag_o_due').del()
    }).then(function () {
      return knex('stg_flag_priority').del()
    })
}

function getTestCaseDetails (caseRefNo, omKey, location) {
  return stagingHelper.getTestCaseDetails(caseRefNo, omKey, location)
}

function getGeneratedCaseRefNo () {
  var refno = Math.floor(Math.random() * 90000) + 10000
  return `REF-${refno}`
}

function mapForInsert (caseDetails) {
  var row = {}
  for (let key in caseDetails) {
    row[aliases[key]] = caseDetails[key]
  }
  return row
}
