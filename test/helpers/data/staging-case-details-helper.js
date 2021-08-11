const knex = require('../../../knex').stagingSchema
const stagingHelper = require('./staging-helper')
const Promise = require('bluebird').Promise

const aliases = {
  caseRefNo: 'case_ref_no',
  location: 'location',
  omGradeCode: 'om_grade_code',
  omKey: 'om_key',
  rowType: 'row_type',
  teamCode: 'team_code',
  tierCode: 'tier_code'
}

const warrantsTableName = 'flag_warr_4_n'
const overdueTerminationsTableName = 'flag_o_due'
const unpaidWorkTableName = 'flag_upw'
const priorityTableName = 'flag_priority'

// Create a test CaseDetails object, mapping properties to column names
const testCaseDetails = mapForInsert(getTestCaseDetails(getGeneratedCaseRefNo(), '12345', 'community'))

module.exports.insertWarrant = function (inserts) {
  return knex(warrantsTableName)
    .withSchema('staging')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: warrantsTableName, id: id[0] })
      return inserts
    })
}

module.exports.insertUnpaidWork = function (inserts) {
  return knex(unpaidWorkTableName)
    .withSchema('staging')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: unpaidWorkTableName, id: id[0] })
      return inserts
    })
}

module.exports.insertOverdueTermination = function (inserts) {
  return knex(overdueTerminationsTableName)
    .withSchema('staging')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: overdueTerminationsTableName, id: id[0] })
      return inserts
    })
}

module.exports.insertPriority = function (inserts) {
  return knex(priorityTableName)
    .withSchema('staging')
    .insert(testCaseDetails)
    .returning('id')
    .then(function (id) {
      inserts.push({ table: priorityTableName, id: id[0] })
      return inserts
    })
}

module.exports.deleteAll = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, function (insert) {
    if (insert.id instanceof Array) {
      return knex(insert.table).withSchema('staging').whereIn('id', insert.id).del()
    } else {
      return knex(insert.table).withSchema('staging').where('id', insert.id).del()
    }
  })
}

function getTestCaseDetails (caseRefNo, omKey, location) {
  return stagingHelper.getTestCaseDetails(caseRefNo, omKey, location)
}

function getGeneratedCaseRefNo () {
  const refno = Math.floor(Math.random() * 90000) + 10000
  return `REF-${refno}`
}

function mapForInsert (caseDetails) {
  const row = {}
  for (const key in caseDetails) {
    row[aliases[key]] = caseDetails[key]
  }
  return row
}
