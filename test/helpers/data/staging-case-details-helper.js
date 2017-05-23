const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
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

const warrantsTableName = `${config.DB_STG_SCHEMA}.flag_warr_4_n`
const overdueTerminationsTableName = `${config.DB_STG_SCHEMA}.flag_o_due`
const unpaidWorkTableName = `${config.DB_STG_SCHEMA}.flag_upw`
const priorityTableName = `${config.DB_STG_SCHEMA}.flag_priority`

// Create a test CaseDetails object, mapping properties to column names
const testCaseDetails = mapForInsert(getTestCaseDetails(getGeneratedCaseRefNo(), '12345', 'community'))

module.exports.insertWarrant = function () {
  return knex(warrantsTableName)
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertUnpaidWork = function () {
  return knex(unpaidWorkTableName)
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertOverdueTermination = function () {
  return knex(overdueTerminationsTableName)
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertPriority = function () {
  return knex(priorityTableName)
    .insert(testCaseDetails)
    .returning('id')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.deleteAll = function () {
  return knex(warrantsTableName).del()
    .then(function () {
      return knex(unpaidWorkTableName).del()
        .then(function () {
          return knex(overdueTerminationsTableName).del()
            .then(function () {
              return knex(priorityTableName).del()
            })
        })
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
