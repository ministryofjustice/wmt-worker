const knex = require('../../../knex').stagingSchema
const stagingHelper = require('./staging-helper')

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

  return inserts.map((deletion) => {
    if (deletion.id instanceof Array) {
      return knex(deletion.table).withSchema('staging').whereIn('id', deletion.id).del()
    } else {
      return knex(deletion.table).withSchema('staging').where('id', deletion.id).del()
    }
  }).reduce(function(prev, current){
    return prev.then(function() {
      return current
    })
  }, Promise.resolve())
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
